import React from 'react';
import classes from './Pagination.module.scss';
import Action from '../../widgets/Action/Action';
import { v4 as uuidv4 } from 'uuid';

const Pagination = ({
  rowsTotal,
  pages,
  pageStart,
  pageEnd,
  currentPage,
  onClickPage,
  onClickPrev,
  onClickNext,
}) => {
  return (
    <div className={classes.pagination}>
      <div className={classes.pagination__action}>
        <Action
          icon={'icon-arrow-left'}
          onClick={onClickPrev}
          isDisabled={currentPage === pages[0]}
        />
      </div>

      <ul className={classes.pagination__pages}>
        {pages.map((page) => {
          if (page > pageStart && page <= pageEnd) {
            return (
              <li
                className={
                  currentPage === page
                    ? `${classes.pagination__page} ${classes.active}`
                    : classes.pagination__page
                }
                key={uuidv4()}
                id={page}
                onClick={onClickPage}
              >
                {page}
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>

      <div className={classes.pagination__action}>
        <Action
          icon={'icon-arrow-right'}
          onClick={onClickNext}
          isDisabled={currentPage === pages[pages.length - 1]}
        />
      </div>

      <span className={classes.pagination__rows}>{rowsTotal} rows</span>
    </div>
  );
};

export default Pagination;
