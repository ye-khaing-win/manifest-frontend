import React, { useState } from 'react';
import Modal from '../../containers/Modal/Modal';
import Action from '../Action/Action';
import classes from './File.module.scss';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';
import Indicator from '../Indicator/Indicator';
import * as helpers from '../../../utilities/helpers';

const File = ({ onUpload, onClose, isMultiple = true }) => {
  const [files, setFiles] = useState([]);
  const fileNames = files.map((file) => file.name);

  const handleImportFiles = async (e) => {
    setFiles(Object.values(e.target.files));
  };

  const handleRemoveFile = (fileName) => {
    const filteredFiles = files.filter((file) => file.name !== fileName);
    setFiles(filteredFiles);
  };

  const handleUpload = () => {
    onUpload(files);
  };

  return (
    <Modal onHideModal={onClose}>
      <div className={classes.file}>
        <div className={classes.file__close}>
          <Action icon="icon-close" action="close" onClick={onClose} />
        </div>

        <div className={classes.file__control}>
          <label className={classes.file__label} htmlFor="file-upload">
            Select Excel File
          </label>
          <input
            className={classes.file__input}
            id="file-upload"
            type="file"
            multiple={isMultiple}
            onChange={handleImportFiles}
            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>

        <ul className={classes.file__files}>
          {helpers.isEmptyArray(fileNames) && (
            <li className={classes.file__file} key={uuidv4()}>
              <span className={classes.file__indicator}>
                <Indicator icon="icon-information" description="yellow" />
              </span>
              No file selected!
            </li>
          )}
          {!helpers.isEmptyArray(fileNames) &&
            fileNames.map((fileName) => (
              <li className={classes.file__file} key={uuidv4()}>
                <span className={classes.file__indicator}>
                  <Indicator icon="icon-excel" description="green" />
                </span>
                {fileName}
                <span className={classes.file__action}>
                  <Action
                    icon="icon-delete"
                    action="delete"
                    onClick={() => {
                      handleRemoveFile(fileName);
                    }}
                  />
                </span>
              </li>
            ))}
        </ul>

        <Button
          action="upload"
          icon="icon-upload"
          description="Upload"
          onClick={handleUpload}
        />
      </div>
    </Modal>
  );
};

export default File;
