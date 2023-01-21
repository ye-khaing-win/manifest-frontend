import React, { useEffect, useState } from 'react';
import Main from '../../../components/containers/Main/Main';
import Toolbar from '../../../components/layouts/Toolbar/Toolbar';
import Table from '../../../components/table/Table/Table';
import { useSelector, useDispatch } from 'react-redux';
import * as commodityActions from '../../../actions/code/commodityActions';
import * as commodityModels from '../../../models/code/commodityModels';
import { Route, Routes } from 'react-router-dom';
import Details from '../../../components/details/Details/Details';
import usePage from '../../../hooks/usePage';
import FormCommodity from './FormCommodity';
import Alert from '../../../components/widgets/Alert/Alert';
import { searchActions } from '../../../store/userInterface/searchSlice';

const PageCommodity = () => {
  const dispatch = useDispatch();

  const [isAddForm, setIsAddForm] = useState(true);

  const page = usePage();
  const commodities = useSelector((state) => state.commodity.items);
  const commodity = useSelector((state) => state.commodity.item);
  const request = useSelector((state) => state.commodity.request);

  const rows = commodities.map((commodity) =>
    commodityModels.createRow(commodity)
  );

  const currentItem = commodity
    ? commodityModels.createDetails(commodity)
    : null;

  const handleAdd = () => {
    setIsAddForm(true);
    page.onShowForm();
  };

  const handleRefresh = () => {
    dispatch(commodityActions.getAll('sort=-createdAt'));
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
      isDisabled: !commodity,
      action: 'update',
    },
    {
      icon: 'icon-delete',
      handler: handleDelete,
      isDisabled: !commodity,
      action: 'delete',
    },
  ];

  useEffect(() => {
    dispatch(commodityActions.getAll('sort=-createdAt'));

    return () => {
      dispatch(commodityActions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchActions.clear());
    dispatch(searchActions.setPlaceholder('Search via Commodity Name'));
  }, []);

  return (
    <>
      <Main>
        {page.isFormShown && (
          <FormCommodity
            request={request}
            currentCommodity={isAddForm ? {} : commodity}
            actions={commodityActions}
            onHideForm={page.onHideForm}
          />
        )}

        {page.isAlertShown && (
          <Alert
            action="delete"
            alertMessage="Are you sure you want to delete this item?"
            onClose={page.onHideAlert}
            onClickButton={() => {
              dispatch(commodityActions.deleteOne(commodity._id));
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
              <Details item={currentItem} action={commodityActions.getOne} />
            }
          />
        </Routes>
      </Main>
    </>
  );
};

export default PageCommodity;
