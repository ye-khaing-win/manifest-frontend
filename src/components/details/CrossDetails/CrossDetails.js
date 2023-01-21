import React from 'react';
import classes from './CrossDetails.module.scss';
import Indicator from '../../widgets/Indicator/Indicator';
import { v4 as uuidv4 } from 'uuid';

const CrossDetails = ({ crossDetails: details }) => {
  return (
    <ul className={classes['cross-details']}>
      {details.map((detail) => (
        <li className={classes['cross-details__detail']} key={uuidv4()}>
          <span className={classes['cross-details__indicator']}>
            <Indicator icon="icon-mark" description="green" />
          </span>
          <span className={classes['cross-details__label']}>
            {detail.label}
          </span>
          <p className={classes['cross-details__description']}>
            {detail.description || 'NULL'}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CrossDetails;
