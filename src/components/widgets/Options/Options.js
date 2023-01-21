import React from 'react';
import classes from './Options.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { isEmptyArray } from '../../../utilities/helpers';

const Options = ({ options, onSelect }) => {
  return (
    <ul className={classes.options}>
      {isEmptyArray(options) ? (
        <li className={classes.options__option}>No options</li>
      ) : (
        options.map((option) => (
          <li
            key={uuidv4()}
            className={classes.options__option}
            onMouseDown={() => {
              onSelect(option);
            }}
          >
            {typeof option === 'string' ? option : option.value}
          </li>
        ))
      )}
    </ul>
  );
};

export default Options;
