import React from 'react';
import classes from './Item.module.scss';
import Indicator from '../../widgets/Indicator/Indicator';

const Item = ({ icon, description }) => {
  return (
    <li className={classes.item}>
      <span className={classes.item__indicator}>
        <Indicator icon={icon} description={description} />
      </span>
      {description}
    </li>
  );
};

export default Item;
