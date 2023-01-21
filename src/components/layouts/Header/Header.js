import React from 'react';
import Brand from '../../widgets/Brand/Brand';
import Search from '../../widgets/Search/Search';
import classes from './Header.module.scss';
import brand from '../../../images/mip-logo.png';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { searchActions } from '../../../store/userInterface/searchSlice';

const Header = () => {
  const dispatch = useDispatch();

  const searchPlaceholder = useSelector((state) => state.search.placeholder);
  const searchedValue = useSelector((state) => state.search.searchedValue);

  const handleSearch = (e) => {
    dispatch(searchActions.search(e.target.value));
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__brand}>
        <Brand src={brand} />
      </div>
      <div className={classes.header__search}>
        <Search
          searchedValue={searchedValue}
          onSearch={handleSearch}
          placeholder={searchPlaceholder}
        />
      </div>
    </header>
  );
};

export default Header;
