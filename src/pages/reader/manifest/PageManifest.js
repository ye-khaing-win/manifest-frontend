import React, { useEffect, useState } from 'react';
import Main from '../../../components/containers/Main/Main';
import Toolbar from '../../../components/layouts/Toolbar/Toolbar';
import File from '../../../components/widgets/File/File';
import Table from '../../../components/table/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import * as manifestActions from '../../../actions/reader/manifestActions';
import * as manifestModels from '../../../models/reader/manifestModels';
import Select from '../../../components/widgets/Select/Select';
import { Route, Routes } from 'react-router-dom';
import Details from '../../../components/details/Details/Details';
import * as helpers from '../../../utilities/helpers';
import Save from '../../../components/widgets/Save/Save';
import { searchActions } from '../../../store/userInterface/searchSlice';

const options = ['All', 'Valid', 'Invalid'];

const PageManifest = () => {
  const dispatch = useDispatch();

  const [isFileShown, setIsFileShown] = useState(false);
  const [isSaveShown, setIsSaveShown] = useState(false);
  const [isManifestFile, setIsManifestFile] = useState(true);
  const [option, setOption] = useState('All');

  const manifests = useSelector((state) => state.manifest.items);
  const manifest = useSelector((state) => state.manifest.item);
  const request = useSelector((state) => state.manifest.request);

  const rows = manifests.map((manifest) => manifestModels.createRow(manifest));

  const itemsFinal = manifests;

  let rows_;

  if (option.toLowerCase() === 'all') {
    rows_ = rows;
  } else if (option.toLowerCase() === 'valid') {
    rows_ = rows.filter((item) => item.status.toLowerCase() === 'valid');
  } else if (option.toLowerCase() === 'invalid') {
    rows_ = rows.filter((item) => item.status.toLowerCase() === 'invalid');
  }

  const currentItem = manifest && manifestModels.createDetails(manifest);

  const handleImportManifest = () => {
    setIsFileShown(true);
    setIsManifestFile(true);
  };

  const handleImportStoragePlan = () => {
    setIsFileShown(true);
    setIsManifestFile(false);
  };

  const handleHideFile = () => {
    setIsFileShown(false);
  };

  const handleRefresh = () => {
    dispatch(manifestActions.reconcile());
  };

  const handleSelect = (option) => {
    setOption(option);
  };

  const handleShowSave = () => {
    setIsSaveShown(true);
  };

  const handleHideSave = () => {
    setIsSaveShown(false);
  };

  const handleUploadManifest = (files) => {
    if (!helpers.isEmptyArray(Object.values(files))) {
      dispatch(manifestActions.importWorkbooks(files));
      dispatch(manifestActions.reconcile());
    }
    handleHideFile();
  };

  const handleMapWithStoragePlan = (files) => {
    if (!helpers.isEmptyArray(Object.values(files))) {
      dispatch(manifestActions.map(files));
    }
    handleHideFile();
  };

  const tools = [
    { icon: 'icon-upload', handler: handleImportManifest },
    { icon: 'icon-refresh', handler: handleRefresh },
    {
      icon: 'icon-stack',
      handler: handleImportStoragePlan,
      isDisabled: helpers.isEmptyArray(manifests),
      action: 'map',
    },
    {
      icon: 'icon-download',
      handler: handleShowSave,
      isDisabled: helpers.isEmptyArray(manifests),
    },
  ];

  useEffect(() => {
    dispatch(searchActions.clear());
    dispatch(searchActions.setPlaceholder('Search via Container Number'));
  }, []);

  return (
    <>
      {isFileShown && (
        <File
          onClose={handleHideFile}
          isMultiple={isManifestFile}
          onUpload={
            isManifestFile ? handleUploadManifest : handleMapWithStoragePlan
          }
        />
      )}
      {isSaveShown && <Save onClose={handleHideSave} items={itemsFinal} />}
      <Main>
        <Toolbar tools={tools}>
          <nav>
            <Select options={options} value={option} onSelect={handleSelect} />
          </nav>
        </Toolbar>
        <Table
          isLoading={request.import.isLoading || request.reconcile.isLoading}
          items={rows_}
          option={option}
          requestStatus={request.import.status}
        />
        <Routes>
          <Route
            path=":id"
            element={
              <Details item={currentItem} action={manifestActions.select} />
            }
          />
        </Routes>
      </Main>
    </>
  );
};

export default PageManifest;
