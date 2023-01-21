import React, { useEffect, useState } from 'react';
import Main from '../../../components/containers/Main/Main';
import Toolbar from '../../../components/layouts/Toolbar/Toolbar';
import Table from '../../../components/table/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import * as shipCodeActions from '../../../actions/code/shipCodeActions';
import * as shipCodeModels from '../../../models/code/shipCodeModels';
import { Route, Routes } from 'react-router-dom';
import Details from '../../../components/details/Details/Details';
import usePage from '../../../hooks/usePage';
import FormShipCode from './FormShipCode';
import Alert from '../../../components/widgets/Alert/Alert';
import { searchActions } from '../../../store/userInterface/searchSlice';

const PageShipCode = () => {
  const dispatch = useDispatch();

  const [isAddForm, setIsAddForm] = useState(true);

  const page = usePage();
  const shipCodes = useSelector((state) => state.shipCode.items);
  const shipCode = useSelector((state) => state.shipCode.item);
  const request = useSelector((state) => state.shipCode.request);

  const rows = shipCodes.map((shipCode) => shipCodeModels.createRow(shipCode));

  const currentItem = shipCode ? shipCodeModels.createDetails(shipCode) : null;

  const handleAdd = () => {
    setIsAddForm(true);
    page.onShowForm();
  };

  const handleRefresh = () => {
    dispatch(shipCodeActions.getAll('sort=-createdAt'));
  };

  const handleUpdate = () => {
    setIsAddForm(false);
    page.onShowForm();
  };

  const handleDelete = page.onShowAlert;

  const tools = [
    { icon: 'icon-upload', handler: handleAdd },
    { icon: 'icon-refresh', handler: handleRefresh },
    {
      icon: 'icon-edit',
      handler: handleUpdate,
      isDisabled: !shipCode,
      action: 'update',
    },
    {
      icon: 'icon-delete',
      handler: handleDelete,
      isDisabled: !shipCode,
      action: 'delete',
    },
  ];

  useEffect(() => {
    dispatch(shipCodeActions.getAll('sort=-createdAt'));

    return () => {
      dispatch(shipCodeActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchActions.clear());
    dispatch(searchActions.setPlaceholder('Search via Shipping Line'));
  }, []);

  return (
    <>
      <Main>
        {page.isFormShown && (
          <FormShipCode
            request={request}
            currentShipCode={isAddForm ? {} : shipCode}
            actions={shipCodeActions}
            onHideForm={page.onHideForm}
          />
        )}

        {page.isAlertShown && (
          <Alert
            action="delete"
            alertMessage="Are you sure you want to delete this item?"
            onClose={page.onHideAlert}
            onClickButton={() => {
              dispatch(shipCodeActions.deleteOne(shipCode._id));
              page.onHideAlert();
            }}
          />
        )}

        <Toolbar tools={tools}></Toolbar>
        <Table
          isLoading={request.fetchAll.isLoading}
          items={rows}
          requestStatus={request.fetchAll.status}
        />
        <Routes>
          <Route
            path=":id"
            element={
              <Details item={currentItem} action={shipCodeActions.getOne} />
            }
          />
        </Routes>
      </Main>
    </>
  );
};

export default PageShipCode;
