import React, { useEffect } from 'react';
import useInput from '../../../hooks/useInput';
import Modal from '../../containers/Modal/Modal';
import Action from '../Action/Action';
import classes from './Save.module.scss';
import * as validators from '../../../utilities/validators';
import Button from '../Button/Button';
import * as xlsx from 'xlsx/xlsx.mjs';
import FormGroup from '../../form/FormGroup/FormGroup';
import useSelect from '../../../hooks/useSelect';
import * as helpers from '../../../utilities/helpers';
import { toastActions } from '../../../store/userInterface/toastSlice';
import * as shipCodeActions from '../../../actions/code/shipCodeActions';
import * as shipCodeModels from '../../../models/code/shipCodeModels';
import catchError from '../../../utilities/catchError';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const fileTypes = [
  {
    value: 'CSV',
  },
  {
    value: 'XLSX',
  },
];

const Save = ({ onClose, items }) => {
  const dispatch = useDispatch();
  const shipCodes = useSelector((state) => state.shipCode.items).map(
    (shipCode) => shipCodeModels.createOptions(shipCode)
  );

  const fileName = useInput('File Name', '', validators.validateIsEmpty);
  const shipCode = useSelect('Ship Code', shipCodes);
  const fileType = useSelect('File Type', fileTypes, '');

  const inputs_ = [
    { ...fileName },
    { isSeparator: true, direction: 'main' },
    { ...shipCode },
    { isSeparator: true, direction: 'main' },
    { ...fileType },
  ];

  const inputs = inputs_.filter((input) => !input.isSeparator);

  const isFormValid = inputs.reduce(
    (isValid, input) => isValid && input.isValid
  );

  const touch = () => {
    inputs.forEach((input) => input.touch());
  };

  const handleSubmitCSV = (e) => {
    e.preventDefault();
    if (!isFormValid) return touch();

    try {
      const containers = items.reduce((acc, curr) => {
        return [...acc, curr.containerNo];
      }, []);

      const uniqueContainers = [...new Set(containers)];

      const uniqueItems = uniqueContainers.map((container) => {
        return items.find((item) => item.containerNo === container);
      });

      const itemsCSV = uniqueItems
        .filter((item) => item.freightKind)
        .map((item) => {
          return {
            ['Vessel']: item.vessel,
            ['Voyage']: item.voyage,
            ['I/B Actual Visit']: item.inboundActualVisit,
            ['ETA']: item.eta,
            ['CY Operator']: item.cyOperator,
            ['ML Number']: item.mlNumber,
            ['BLRefNbr']: `${shipCode.id}${item.blNumber}`,
            ['Unit Nbr']: item.containerNo,
            ['SizeType']: item.containerType,
            ['Type ISO']: item.isoType,
            ['Frght Kind']: item.freightKind,
            ['IMDG']: item.imdgNo,
            ['Hzd UNNbrs']: item.hzdNo,
            ['Line Op']: item.lineOperator,
            ['ShipCode']: shipCode.id,
            ['POL']: item.pol,
            ['HS Code']: item.hsCode,
            ['Desc Of Goods']: item.descOfGoods,
            ['Commodity']: item.commodity || item.descOfGoods.slice(0, 75),
            ['CommDesc']: item.commDesc,
            ['CommDetails']: item.commDetails,
            ['Pkgs']: item.pkgs,
            ['Weight']: item.weight,
            ['Volume']: item.volume,
            ['Consignee']: item.consignee.slice(0, 75),
            ['Consignor']: item.consignor.slice(0, 75),
            ['Notify Party']: item.notifyParty.slice(0, 75),
          };
        });

      if (helpers.isEmptyArray(itemsCSV))
        throw new Error('Mapped items cannot be empty!');

      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(itemsCSV);

      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, `${fileName.value}.csv`, {
        bookType: 'csv',
        type: 'buffer',
      });

      dispatch(
        toastActions.add({
          id: uuidv4(),
          status: 'success',
          message: 'Data downloaded successfully!',
        })
      );
    } catch (error) {
      const err = catchError(error);
      dispatch(toastActions.add(err));
    }

    onClose();
  };

  const handleSubmitXLSX = (e) => {
    e.preventDefault();

    if (!isFormValid) return touch();

    try {
      const itemsXLSX = items.map((item) => {
        return {
          ['Vessel']: item.vessel,
          ['Voyage']: item.voyage,
          ['I/B Actual Visit']: item.inboundActualVisit,
          ['ETA']: item.eta,
          ['CY Operator']: item.cyOperator,
          ['ML Number']: item.mlNumber,
          ['BLRefNbr']: item.blNumber,
          ['Unit Nbr']: item.containerNo,
          ['SizeType']: item.containerType,
          ['Type ISO']: item.isoType,
          ['Frght Kind']: item.freightKind,
          ['IMDG']: item.imdgNo,
          ['Hzd UNNbrs']: item.hzdNo,
          ['Line Op']: item.lineOperator,
          ['ShipCode']: shipCode.id,
          ['POL']: item.pol,
          ['HS Code']: item.hsCode,
          ['Desc Of Goods']: item.descOfGoods,
          ['Commodity']: item.commodity,
          ['CommDesc']: item.commDesc,
          ['CommDetails']: item.commDetails,
          ['Pkgs']: item.pkgs,
          ['Weight']: item.weight,
          ['Volume']: item.volume,
          ['Consignee']: item.consignee,
          ['Consignor']: item.consignor,
          ['Notify Party']: item.notifyParty,
        };
      });

      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(itemsXLSX);

      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, `${fileName.value}.xlsx`, {
        bookType: 'xlsx',
        type: 'buffer',
      });

      dispatch(
        toastActions.add({
          id: uuidv4(),
          status: 'success',
          message: 'Data downloaded successfully!',
        })
      );
    } catch (error) {
      const err = catchError(error);
      dispatch(toastActions.add(err));
    }

    onClose();
  };

  useEffect(() => {
    dispatch(shipCodeActions.getAll());

    return () => {
      dispatch(shipCodeActions.reset());
    };
  }, [dispatch]);

  return (
    <Modal onHideModal={onClose}>
      <form
        className={classes.save}
        onSubmit={fileType.value === 'CSV' ? handleSubmitCSV : handleSubmitXLSX}
      >
        <div className={classes.save__close}>
          <Action icon="icon-close" action="close" onClick={onClose} />
        </div>

        <div className={classes.save__control}>
          {/* <Input {...fileName} />
          <Separator direction="main" />
          <Input {...shipCode} /> */}
          <FormGroup direction="cross" inputs={inputs_} />
        </div>

        <Button action="download" icon="icon-download" description="Download" />
      </form>
    </Modal>
  );
};

export default Save;
