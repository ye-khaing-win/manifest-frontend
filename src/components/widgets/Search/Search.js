import React from 'react';
import icons from '../../../images/icons.svg';

import classes from './Search.module.scss';

const Search = ({ searchedValue, placeholder = 'Search', onSearch }) => {
  return (
    <div className={classes.search}>
      <input
        type="text"
        className={classes.search__input}
        placeholder={placeholder}
        onChange={onSearch}
        value={searchedValue}
      />

      <svg className={classes.search__icon}>
        <use xlinkHref={`${icons}#icon-search`}></use>
      </svg>
    </div>
  );
};

export default Search;
