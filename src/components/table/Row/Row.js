import React from 'react';
import { NavLink } from 'react-router-dom';
import Column from '../Column/Column';
import classes from './Row.module.scss';
import { v4 as uuidv4 } from 'uuid';

const Row = ({ columns, id }) => {
  return (
    <li className={classes.row}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${classes.row__link} ${classes['row__link--active']}`
            : classes.row__link
        }
        to={id}
      >
        <ul className={classes.row__columns}>
          {columns.map((cell) => (
            <Column key={uuidv4()} {...cell} />
          ))}
        </ul>
      </NavLink>
    </li>
  );
};

export default Row;
