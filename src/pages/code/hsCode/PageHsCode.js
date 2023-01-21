import React, { useEffect, useState } from 'react';
import Main from '../../../components/containers/Main/Main';
import Toolbar from '../../../components/layouts/Toolbar/Toolbar';
import Table from '../../../components/table/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import * as hsCodeActions from '../../../actions/code/hsCodeActions';
import * as hsCodeModels from '../../../models/code/hsCodeModels';
import { Route, Routes } from 'react-router-dom';
import Details from '../../../components/details/Details/Details';
import usePage from '../../../hooks/usePage';
import FormHsCode from './FormHsCode';

import Alert from '../../../components/widgets/Alert/Alert';
import { searchActions } from '../../../store/userInterface/searchSlice';

const PageHsCode = () => {
  const dispatch = useDispatch();

  const [isAddForm, setIsAddForm] = useState(true);

  const page = usePage();
  const hsCodes = useSelector((state) => state.hsCode.items);
  const hsCode = useSelector((state) => state.hsCode.item);
  const request = useSelector((state) => state.hsCode.request);

  const rows = hsCodes.map((hsCode) => hsCodeModels.createRow(hsCode));

  const currentItem = hsCode ? hsCodeModels.createDetails(hsCode) : null;

  const handleAdd = () => {
    setIsAddForm(true);
    page.onShowForm();
  };

  const handleRefresh = () => {
    dispatch(hsCodeActions.getAll('sort=-createdAt'));
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
      isDisabled: !hsCode,
      action: 'update',
    },
    {
      icon: 'icon-delete',
      handler: handleDelete,
      isDisabled: !hsCode,
      action: 'delete',
    },
  ];

  useEffect(() => {
    dispatch(hsCodeActions.getAll('sort=-createdAt'));

    return () => {
      dispatch(hsCodeActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchActions.clear());
    dispatch(searchActions.setPlaceholder('Search via HS Code'));
  }, []);

  return (
    <>
      <Main>
        {page.isFormShown && (
          <FormHsCode
            request={request}
            currentHsCode={isAddForm ? {} : hsCode}
            actions={hsCodeActions}
            onHideForm={page.onHideForm}
          />
        )}

        {page.isAlertShown && (
          <Alert
            action="delete"
            alertMessage="Are you sure you want to delete this item?"
            onClose={page.onHideAlert}
            onClickButton={() => {
              dispatch(hsCodeActions.deleteOne(hsCode._id));
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
              <Details item={currentItem} action={hsCodeActions.getOne} />
            }
          />
        </Routes>
      </Main>
    </>
  );
};

export default PageHsCode;
