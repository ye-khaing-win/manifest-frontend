import React from 'react';
import { useSelector } from 'react-redux';
import Toast from '../Toast/Toast';
import classes from './Toasts.module.scss';

const Toasts = () => {
  const toasts = useSelector((state) => state.toast.items);
  return (
    <ul className={classes.toasts}>
      {toasts.map((toast) => (
        <li className={classes.toasts__toast} key={toast.id}>
          <Toast toast={toast} />
        </li>
      ))}
    </ul>
  );
};

export default Toasts;
