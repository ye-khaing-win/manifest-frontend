import React from 'react';
import icons from '../../../images/icons.svg';
import classes from './MasterButton.module.scss';

const MasterButton = () => {
  return (
    <div className={classes.button}>
      <div className={classes.button__title}>ATLD109</div>
      <button className={classes.button__action}>
        <svg className={classes.button__icon}>
          <use xlinkHref={`${icons}#icon-search`}></use>
        </svg>
      </button>
    </div>
  );
};

export default MasterButton;
