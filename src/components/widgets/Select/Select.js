import React, { useState } from 'react';
import classes from './Select.module.scss';
import icons from '../../../images/icons.svg';
import Options from '../Options/Options';

const Select = ({ options, value, onSelect }) => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  const handleToggleOptions = () => {
    setIsOptionsShown(!isOptionsShown);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOptionsShown(false);
  };

  const handleBlur = () => {
    setIsOptionsShown(false);
  };

  return (
    <div className={classes.select}>
      <div
        tabIndex={0}
        className={classes.select__select}
        onClick={handleToggleOptions}
        onBlur={handleBlur}
      >
        {value}
        <svg className={classes.select__icon}>
          <use xlinkHref={`${icons}#icon-chevron-down`}></use>
        </svg>
      </div>

      {isOptionsShown && <Options options={options} onSelect={handleSelect} />}
    </div>
  );
};

export default Select;
