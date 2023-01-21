import React from 'react';
import classes from './Main.module.scss';

// import Toolbar from '../../layouts/Toolbar/Toolbar';
// import Table from '../../table/Table/Table';
// import Details from '../../details/Details/Details';
// import { Route, Routes } from 'react-router-dom';

const Main = ({
  children,
  // items,
  // item,
  // request,
  // actions,
  // onAdd,
  // onRefresh,
  // onUpdate,
  // onDelete,
}) => {
  return (
    <>
      <main className={classes.main}>
        {children}
        {/* <Toolbar
          hasCurrentItem={item}
          onAdd={onAdd}
          onRefresh={onRefresh}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <Table
          isLoading={request.fetchAll.isLoading}
          items={items}
          requestStatus={request.fetchAll.status}
          getAll={actions.getAll}
          reset={actions.reset}
        />
        <Routes>
          <Route
            path=":id"
            element={
              <Details
                isLoading={request.fetchOne.isLoading}
                item={item}
                requestStatus={request.fetchOne.status}
                getOne={actions.getOne}
              />
            }
          />
        </Routes> */}
      </main>
    </>
  );
};

export default Main;
