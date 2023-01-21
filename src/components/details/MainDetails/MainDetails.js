import React from 'react';
import classes from './MainDetails.module.scss';
import icons from '../../../images/icons.svg';
import { v4 as uuidv4 } from 'uuid';

const MainDetails = ({ mainDetails: details }) => {
  return (
    <ul className={classes['main-details']}>
      {details.map((detail) => (
        <li className={classes['main-details__detail']} key={uuidv4()}>
          <svg className={classes['main-details__icon']}>
            <use xlinkHref={`${icons}#${detail.icon}`}></use>
          </svg>
          <span className={classes['main-details__label']}>{detail.label}</span>
          <span className={classes['main-details__description']}>
            {detail.description}
          </span>
          {detail.unit && (
            <span className={classes['main-details__unit']}>{detail.unit}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MainDetails;
