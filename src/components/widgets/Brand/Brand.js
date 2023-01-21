import React from 'react';
import classes from './Brand.module.scss';

const Brand = ({ src }) => {
  return (
    <div className={classes.brand}>
      <img className={classes.brand__image} src={src} alt="toss logo" />
    </div>
  );
};

export default Brand;
