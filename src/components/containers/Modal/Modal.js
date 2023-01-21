import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Modal = ({ children, onHideModal }) => {
  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} onClick={onHideModal}></div>
      <div className={classes.modal}>{children}</div>
    </>,
    document.getElementById('overlays')
  );
};

export default Modal;
