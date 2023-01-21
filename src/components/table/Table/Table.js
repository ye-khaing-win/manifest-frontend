// import React, { useEffect } from 'react';
import Row from '../Row/Row';
import classes from './Table.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';
import Spinner from '../../widgets/Spinner/Spinner';
import { useSelector } from 'react-redux';

const Table = ({ items, isLoading }) => {
  const searchedValue = useSelector((state) => state.search.searchedValue);

  const rows = !isLoading
    ? items.filter((item) =>
        item.searchedBy.toLowerCase().includes(searchedValue.toLowerCase())
      )
    : [];

  const pagination = usePagination(rows, searchedValue);
  const paginatedRows = pagination.currentItems;

  return (
    <div className={classes.table}>
      {rows.length !== 0 && (
        <div className={classes.table__table}>
          <ul className={classes.table__rows}>
            {paginatedRows.map((row) => (
              <Row key={uuidv4()} {...row} />
            ))}
          </ul>
          <div className={classes.table__pagination}>
            <Pagination {...pagination} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className={classes.table__spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Table;
