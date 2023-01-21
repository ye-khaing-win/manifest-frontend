import React from 'react';
import classes from './Card.module.scss';
import icons from '../../../images/icons.svg';

const Card = ({ icon, text }) => {
  return (
    <div className={classes.card}>
      <span className={classes.card__indicator}>
        <svg className={classes.card__icon}>
          <use xlinkHref={`${icons}#${icon}`}></use>
        </svg>
      </span>

      <p className={classes.card__text}>{text}</p>
    </div>
  );
};

export default Card;
