import React from 'react';
import classes from './Separator.module.scss';

const Separator = ({ direction }) => {
  const separatorClasses = [classes.separator];

  direction && separatorClasses.push(classes[`separator--${direction}`]);

  return <span className={separatorClasses.join(' ')}></span>;
};

export default Separator;
