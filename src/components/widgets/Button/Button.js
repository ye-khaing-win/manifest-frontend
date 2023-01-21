import React from 'react';
import classes from './Button.module.scss';
import icons from '../../../images/icons.svg';

const Button = ({ icon, action, onClick }) => {
  let color;

  switch (String(action).toLowerCase()) {
    case 'upload':
    case 'download':
      color = 'green';
      break;
    case 'update':
      color = 'yellow';
      break;
    case 'delete':
      color = 'red';
      break;
    default:
      color = null;
  }

  const buttonClasses = [classes.button];

  color && buttonClasses.push(classes[`button--${color}`]);

  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      {icon && (
        <svg className={classes.button__icon}>
          <use xlinkHref={`${icons}#${icon}`}></use>
        </svg>
      )}
      <span className={classes.button__action}>{action}</span>
    </button>
  );
};

export default Button;
