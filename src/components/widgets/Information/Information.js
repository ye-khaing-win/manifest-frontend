import React from 'react';
import classes from './Information.module.scss';
import icons from '../../../images/icons.svg';

const Information = ({ message }) => {
  return (
    <div className={classes.information}>
      <svg className={classes.information__icon}>
        <use xlinkHref={`${icons}#icon-information`}></use>
      </svg>
      <p className={classes.information__message}>{message}</p>
    </div>
  );
};

export default Information;
