import React from 'react';
import classes from './Alert.module.scss';
import icons from '../../../images/icons.svg';
import Modal from '../../containers/Modal/Modal';
import Action from '../Action/Action';
import Button from '../Button/Button';

const Alert = ({ action, alertMessage, onClose, onClickButton }) => {
  return (
    <Modal onHideModal={onClose}>
      <div className={classes.alert}>
        <div className={classes.alert__close}>
          <Action icon="icon-close" action="close" onClick={onClose} />
        </div>
        <div className={classes.alert__message}>
          <svg className={classes.alert__icon}>
            <use xlinkHref={`${icons}#icon-alert`}></use>
          </svg>
          {alertMessage}
        </div>

        <Button action={action} onClick={onClickButton} />
      </div>
    </Modal>
  );
};

export default Alert;
