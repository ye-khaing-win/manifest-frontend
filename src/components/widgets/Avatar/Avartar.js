import React from 'react';

import classes from './Avatar.module.scss';

const Avatar = ({ name, imageUrl }) => {
  return (
    <div className={classes.avatar}>
      <img className={classes.avatar__image} src={imageUrl} alt={name} />
      <span className={classes.avatar__name}>{name}</span>
    </div>
  );
};

export default Avatar;
