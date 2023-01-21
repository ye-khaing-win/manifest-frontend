import React from 'react';
import classes from './App.module.scss';
import Header from './components/layouts/Header/Header';
import SideMenu from './components/sidebar/SideMenu/SideMenu';
import PageManifest from './pages/reader/manifest/PageManifest';
import { Route, Routes } from 'react-router-dom';
import PageCommodity from './pages/code/commodity/PageCommodity';
import PageHsCode from './pages/code/hsCode/PageHsCode';
import PageShipCode from './pages/code/shipCode/PageShipCode';
import Toasts from './components/toasts/Toasts/Toasts';

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.app__content}>
        <SideMenu />
        <Routes>
          <Route path="/manifests/*" element={<PageManifest />} />
          <Route path="/commodities/*" element={<PageCommodity />} />
          <Route path="/hs-codes/*" element={<PageHsCode />} />
          <Route path="/ship-codes/*" element={<PageShipCode />} />
        </Routes>
      </div>
      <Toasts />
    </div>
  );
};

export default App;
