import React, { useCallback, useEffect, useState } from 'react';
import classes from './Toast.module.scss';
import Action from '../../widgets/Action/Action';
import Indicator from '../../widgets/Indicator/Indicator';
import { toastActions } from '../../../store/userInterface/toastSlice';
import { useDispatch } from 'react-redux';

const Toast = ({ toast }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isErrorHidden, setIsErrorHidden] = useState(false);

  // ERROR
  const toastClasses = [classes.toast];

  isErrorHidden && toastClasses.push(classes['toast--hidden']);

  // INDICATOR
  const indicatorColor = toast.status === 'success' ? 'green' : 'red';
  const indicatorIcon =
    toast.status === 'success' ? 'icon-information' : 'icon-error-round';

  // BAR
  const barClasses = [classes.toast__bar];

  toast.status === 'success' && barClasses.push(classes['toast__bar--green']);

  const handleStart = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) return prev + 0.5;

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalId(id);
  };

  const handlePause = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleClose = useCallback(() => {
    setIsErrorHidden(true);
    handlePause();

    setTimeout(() => {
      dispatch(toastActions.remove(toast.id));
    }, 1000);
  }, [dispatch, toast, handlePause]);

  useEffect(() => {
    handleStart();
  }, []);

  useEffect(() => {
    if (width === 100) handleClose();
  }, [width, handleClose]);

  return (
    <div
      className={toastClasses.join(' ')}
      onMouseEnter={handlePause}
      onMouseLeave={handleStart}
    >
      <div className={classes.toast__close}>
        <Action icon="icon-close" action="close" onClick={handleClose} />
      </div>

      <main className={classes.toast__main}>
        <span className={classes.toast__indicator}>
          <Indicator icon={indicatorIcon} description={indicatorColor} />
        </span>

        <div className={classes.toast__content}>
          <h6 className={classes.toast__heading}>
            {toast.status.toUpperCase()}
          </h6>
          <p className={classes.toast__message}>{toast.message}</p>
        </div>
      </main>

      <span
        className={barClasses.join(' ')}
        style={{ width: `${width}%` }}
      ></span>
    </div>
  );
};

export default Toast;
