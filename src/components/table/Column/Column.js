import React from 'react';
import classes from './Column.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Item from '../ColumnItem/Item';

const Column = ({ heading, items }) => {
  return (
    <div className={classes.column}>
      <h6 className={classes.column__heading}>{heading}</h6>
      <ul className={classes.column__items}>
        {items.map((item) => (
          <Item key={uuidv4()} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default Column;
