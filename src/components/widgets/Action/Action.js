import React from 'react';
import classes from './Action.module.scss';
import icons from '../../../images/icons.svg';

const Action = ({ icon, action, isDisabled = false, onClick }) => {
  let color;

  switch (String(action)?.toLowerCase()) {
    case 'update':
    case 'map':
      color = 'yellow';
      break;
    case 'cancel':
    case 'delete':
    case 'close':
      color = 'red';
      break;
    default:
      color = null;
      break;
  }

  const actionClasses = [classes.action];
  const iconClasses = [classes.action__icon];

  // ICON COLOR
  color && iconClasses.push(classes[`action__icon--${color}`]);

  // ACTION CLOSE
  action === 'close' && actionClasses.push(classes['action--close']);

  return (
    <button
      className={actionClasses.join(' ')}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={isDisabled}
    >
      <svg className={iconClasses.join(' ')}>
        <use xlinkHref={`${icons}#${icon}`}></use>
      </svg>
    </button>
  );
};

export default Action;
