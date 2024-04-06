import { createSlice } from '@reduxjs/toolkit';
import * as xlsx from 'xlsx/xlsx.mjs';
import * as helpers from '../../utilities/helpers';
import { v4 as uuidv4 } from 'uuid';
import units from '../../data/units.json';
import types from '../../data/types.json';

const parseBl = (ws) => {
  // 1) PARSE SHEET TO JSON
  const json = ws.map((ws) => xlsx.utils.sheet_to_json(ws, { range: 4 }));

  // 2) REMOVE WHITE SPACES FROM SHEET OBJECT
  const data = json.map((ws) =>
    ws.map((w) => {
      const obj = {};
      Object.keys(w).forEach((key) => {
        obj[helpers.removeWhiteSpaces(key).toLowerCase()] = w[key];
      });

      return obj;
    })
  );

  console.log(data);

  // 3) CONSTRUCT CONTAINER BASED MANIFEST FROM SHEET
  const vessel = ws[0]['F4'].v.slice(0, -4);
  const voyage = ws[0]['J4'].v;
  const eta = ws[0]['M4'].v;

  const manifests = data.reduce((acc, cur) => {
    const containerNos_ = cur[1]['b/lno./containerno.'];
    const containerTypes_ = cur[1]['marks&nos./containertype'];
    const cyOperator_ = cur[0]['cyoperator'];
    const mlNumber_ = cur[0]['m/lno'];
    const blNumber_ = cur[0]['b/lno./containerno.'];
    const pol_ = cur[0]['portofloadingcode'];
    const pkgs_ = cur[0]['noofpkges'] || '0';
    const partner_ = cur[0]["(c'or)-consignor-(c'ee)-consignee(n)-notifyparty"];
    const descOfGoods_ = cur[0]['desc:ofgoods'];
    const weight_ = cur[0]['wgt'];
    const volume_ = cur[0]['m3'];

    const containerNos = containerNos_
      ? containerNos_
          .split('\n')
          .filter((container) => helpers.isContainerNumber(container))
      : [];
    const containerTypes = containerTypes_
      ? containerTypes_
          .split('\n')
          .map((containerType) => containerType.trim())
          .filter((type) => type !== '')
          .map((type) => {
            let sz = helpers.extractOnlyNumbers(type) || '';

            if (sz === '20') {
              sz = '22';
            } else if (sz === '40') {
              sz = '42';
            }

            const ty =
              types.find((t) =>
                type.toLowerCase().includes(t.type.toLowerCase())
              ) || {};

            return [`${sz}${ty.type}`, `${sz}${ty.isoNo}`];
          })
      : [];

    const teusTotal = containerTypes_
      ? containerTypes.reduce((acc, current) => {
          acc += current[0].startsWith('2') ? 1 : 2;

          return acc;
        }, 0)
      : 1;

    const qtyTotal = helpers.hasNumbers(pkgs_)
      ? helpers.extractOnlyNumbers(pkgs_)
      : 0;

    const qtyPerTeu = Number(qtyTotal) / teusTotal;

    const unit = units.find((unit) =>
      pkgs_.toLowerCase().includes(unit.description.toLowerCase())
    ) ||
      units.find((unit) =>
        pkgs_.toLowerCase().includes(unit.code.toLowerCase())
      ) || { code: 'ZZ', description: 'OTHER' };

    const weightTotal =
      weight_ && helpers.hasNumbers(weight_)
        ? helpers.extractDecimalNumber(weight_)
        : 0;
    const volumeTotal =
      volume_ && helpers.hasNumbers(volume_)
        ? helpers.extractDecimalNumber(volume_)
        : 0;
    const weightPerTeu = Number(weightTotal) / teusTotal;

    const volumePerTeu = Number(volumeTotal) / teusTotal;

    const hasHsCode = helpers.hasHsCode(descOfGoods_);
    let hsCode = hasHsCode
      ? helpers
          .extractOnlyNumbers(
            helpers.extractNextChars(descOfGoods_, 'code') ||
              helpers.extractNextChars(descOfGoods_, 'hs') ||
              helpers.extractNextChars(descOfGoods_, 'h.s') ||
              helpers.extractNextChars(descOfGoods_, 'h s')
          )
          .slice(0, 6)
      : null;

    acc.push(
      ...containerNos.map((container, i) => {
        const teus = String(containerTypes[i][0]).startsWith('2') ? 1 : 2;
        const consignor_ =
          helpers.extractString(partner_, "C'or: ", '\n') ||
          helpers.extractString(partner_, "C'or : ", '\n') ||
          '';
        const consignee_ =
          helpers.extractString(partner_, "C'ee: ", '\n') ||
          helpers.extractString(partner_, "C'ee : ", '\n') ||
          '';

        const notifyParty_ =
          helpers.extractString(partner_, 'N: ', '\n') ||
          helpers.extractString(partner_, 'N : ', '\n') ||
          '';

        const consignee = consignee_.toLowerCase().includes('to order')
          ? notifyParty_
          : consignee_;

        return {
          vessel,
          voyage,
          inboundActualVisit: null,
          eta,
          id: uuidv4(),
          cyOperator: cyOperator_,
          mlNumber: mlNumber_,
          blNumber: blNumber_,
          containerNo: container,
          containerType: containerTypes[i][0],
          isoType: containerTypes[i][1],
          freightKind: null,
          lineOperator: null,
          shipCode: null,
          isMapped: false,
          pol: pol_,
          hasHsCode,
          hsCode,
          descOfGoods: descOfGoods_,
          commodity: null,
          commDesc: null,
          commDetails: null,
          pkgs: `${(qtyPerTeu * teus).toFixed(2)} ${unit.code}`,
          weight: (weightPerTeu * teus).toFixed(2),
          volume: (volumePerTeu * teus).toFixed(2),
          consignor: consignor_,
          consignee,
          notifyParty: notifyParty_,
        };
      })
    );

    return acc;
  }, []);

  return manifests;
};

const manifestSlice = createSlice({
  name: 'manifest',
  initialState: {
    items: [],
    item: null,
    request: {
      import: {
        isLoading: false,
        status: null,
      },
      reconcile: {
        isLoading: false,
        status: null,
      },
      map: {
        isLoading: false,
        status: null,
      },
    },
  },
  reducers: {
    import(state) {
      state.request.import.isLoading = true;
      state.request.import.status = 'loading';
    },

    importSuccess(state, action) {
      const worksheets = action.payload;
      state.request.import.isLoading = false;
      state.request.import.status = 'success';

      state.items = worksheets.reduce(
        (acc, curr) => [...acc, ...parseBl(curr)],
        []
      );
    },

    importFailure(state) {
      state.request.import.isLoading = false;
      state.request.import.status = 'fail';
    },

    reconcile(state) {
      state.request.reconcile.isLoading = true;
      state.request.reconcile.status = 'loading';
    },

    reconcileSuccess(state, action) {
      const hsCodes = action.payload.hsCodes;
      const codes = action.payload.commodities;

      state.request.reconcile.isLoading = false;
      state.request.reconcile.status = 'success';

      const items = state.items.map((item) => {
        let commodity =
          hsCodes.find((hsCode) => hsCode.hsCode === item.hsCode) || null;
        const hasHsCode = commodity;

        if (!commodity) {
          commodity = codes.find((code) => {
            return code.keywords.find((keyword) => {
              return item.descOfGoods
                .toLowerCase()
                .includes(keyword.trim().toLowerCase());
            });
          });
        }

        return {
          ...item,
          commodity: commodity ? commodity.name || commodity.description : null,
          commDesc: hasHsCode ? commodity.description : null,
          commDetails: hasHsCode
            ? String(commodity.details).replace('-', '')
            : null,
        };
      });

      state.items = items;
    },

    reconcileFailure(state) {
      state.request.reconcile.isLoading = false;
      state.request.reconcile.status = 'fail';
    },

    map(state) {
      state.request.map.isLoading = true;
      state.request.map.status = 'loading';
    },

    mapSuccess(state, action) {
      const units = action.payload;

      state.request.map.isLoading = false;
      state.request.map.status = 'success';

      // const json = xlsx.utils.sheet_to_json(worksheet, { raw: false });

      // const units = json.map((unit) => {
      //   const obj = {};
      //   Object.keys(unit).forEach((key) => {
      //     obj[helpers.removeWhiteSpaces(key).toLowerCase()] = unit[key];
      //   });

      //   return obj;
      // });

      const items = state.items.map((item) => {
        const unit = units.find(
          (unit) =>
            String(unit['unitnbr']).toLowerCase() ===
            String(item.containerNo).toLowerCase()
        );

        return {
          ...item,
          // blNumber:
          //   unit && unit['shipcode']
          //     ? `${unit['shipcode']}${item.blNumber}`
          //     : item.blNumber,
          imdgNo: unit ? unit['imdg']?.split(',')[0] : null,
          hzdNo: unit ? unit['hzdunnbrs']?.replace(',', '')?.slice(0, 4) : null,
          isoType: unit ? unit['typeiso'] : item.isoType,
          freightKind: unit ? unit['frghtkind'] : null,
          inboundActualVisit: unit ? unit['i/bactualvisit'] : null,
          lineOperator: unit ? unit['lineop'] : null,
          isMapped: unit ? true : false,
        };
      });

      state.items = items;
    },

    mapFailure(state) {
      state.request.map.isLoading = false;
      state.request.map.status = 'fail';
    },

    select(state, action) {
      const id = action.payload;

      const item = state.items.find((item) => item.id === id);
      state.item = item;
    },

    clearAll(state) {
      state.items = [];
    },

    // CLEAR ITEM
    clearOne(state) {
      state.item = null;
    },
  },
});

export const manifestActions = manifestSlice.actions;

export default manifestSlice;
