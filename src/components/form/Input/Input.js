import React from 'react';
import classes from './Input.module.scss';
import Indicator from '../../widgets/Indicator/Indicator';
import Options from '../../widgets/Options/Options';
import Calendar from '../../widgets/Calendar/Calendar';
import { isEmptyString } from '../../../utilities/helpers';

const Input = ({
  type = 'text',
  label,
  value,
  options,
  isOptionsShown,
  isCalendarShown,
  isValid,
  hasError,
  onChange,
  onSelect,
  onClick,
  onClickCalendar,
  onBlur,
  span,
  isReadOnly,
}) => {
  const inputClasses = [classes.input];
  const messageClasses = [classes.input__message];

  type === 'textarea' && inputClasses.push(classes['input--textarea']);
  span && inputClasses.push(classes[`input--span-${span}`]);
  hasError && messageClasses.push(classes.invalid);
  isValid && !isEmptyString(value) && messageClasses.push(classes.valid);

  return (
    <div className={inputClasses.join(' ')} onBlur={onBlur}>
      <div className={classes.input__control}>
        <label className={classes.input__label}>
          {isValid && !isEmptyString(value) && (
            <div className={classes.input__indicator}>
              <Indicator
                icon="icon-mark"
                description="white"
                bgColor="light-green"
              />
            </div>
          )}
          <span className={messageClasses.join(' ')}>{label}</span>
        </label>
        {(type === 'text' || type == 'select') && (
          <input
            className={classes.input__text}
            type={type}
            value={value}
            onChange={onChange}
            onClick={onClick}
            readOnly={isReadOnly}
          />
        )}

        {type === 'textarea' && (
          <textarea
            className={classes.input__textarea}
            value={value}
            onChange={onChange}
            onClick={onClick}
          ></textarea>
        )}

        {type === 'select' && (
          <span className={classes.input__dropdown}>
            <Indicator icon="icon-chevron-down" bgColor="grey" />
          </span>
        )}

        {type === 'calendar' && (
          <span className={classes.input__dropdown} onClick={onClickCalendar}>
            <Indicator icon="icon-calendar" bgColor="grey" />
          </span>
        )}
      </div>

      {isOptionsShown && (
        <Options
          options={options}
          isOptionsShown={isOptionsShown}
          onSelect={onSelect}
        />
      )}

      {isCalendarShown && <Calendar onSelectDate={onSelect} />}
    </div>
  );
};

export default Input;
