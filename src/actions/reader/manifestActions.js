import { manifestActions } from '../../store/reader/manifestSlice';
import * as xlsx from 'xlsx/xlsx.mjs';
import * as api from '../../utilities/api';
import catchError from '../../utilities/catchError';
import { toastActions } from '../../store/userInterface/toastSlice';
import { v4 as uuidv4 } from 'uuid';
import * as helpers from '../../utilities/helpers';

// eslint-disable-next-line no-undef
const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}`;

export const importWorkbooks = (files) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(manifestActions.clearAll());

    dispatch(manifestActions.import());

    const promises = Object.values(files).map((file) => {
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = () =>
          resolve(xlsx.read(reader.result, { type: 'binary' }));
        reader.readAsArrayBuffer(file);
      });
    });

    const workbooks = await Promise.all(promises);

    const worksheets = workbooks.reduce((acc, curr) => {
      acc.push(curr.SheetNames.map((sheetName) => curr.Sheets[sheetName]));
      return acc;
    }, []);

    // GET SUCCEED
    dispatch(manifestActions.importSuccess(worksheets));
    dispatch(
      toastActions.add({
        id: uuidv4(),
        status: 'success',
        message: 'Data imported successfully!',
      })
    );
  } catch (error) {
    // GET FAILED
    const err = catchError(error);

    dispatch(toastActions.add(err));
    dispatch(manifestActions.importFailure());
  }
};

export const reconcile = () => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(manifestActions.reconcile());

    const resHsCode = await api.fetchAll(`${SERVER_URL}/hs-codes`);
    const resCommodity = await api.fetchAll(`${SERVER_URL}/commodities`);

    const hsCodes = resHsCode.data.data;
    const commodities = resCommodity.data.data;

    // GET SUCCEED
    dispatch(manifestActions.reconcileSuccess({ hsCodes, commodities }));
    dispatch(
      toastActions.add({
        id: uuidv4(),
        status: 'success',
        message: 'Data reconciled successfully!',
      })
    );
  } catch (error) {
    // GET FAILED
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(manifestActions.reconcileFailure());
  }
};

export const map = (files) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(manifestActions.map());

    const reader = new FileReader();
    reader.onload = () => {
      const wb = xlsx.read(reader.result, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];

      const json = xlsx.utils.sheet_to_json(ws, { raw: false });

      const units = json.map((unit) => {
        const obj = {};
        Object.keys(unit).forEach((key) => {
          obj[helpers.removeWhiteSpaces(key).toLowerCase()] = unit[key];
        });

        return obj;
      });

      if (!('unitnbr' in units[0]))
        throw new Error('Wrong fromat. Please check your file!');

      dispatch(manifestActions.mapSuccess(units));

      dispatch(
        toastActions.add({
          id: uuidv4(),
          status: 'success',
          message: 'Data mapped successfully!',
        })
      );
    };
    reader.readAsArrayBuffer(files[0]);
  } catch (error) {
    console.log(error);
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(manifestActions.mapFailure());
  }
};

export const select = manifestActions.select;
