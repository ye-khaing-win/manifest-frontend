import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './SideSubMenuItem.module.scss';

const SideSubMenuItem = ({ description, path = '/' }) => {
  return (
    <li className={classes.submenu__item}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${classes.submenu__link} ${classes['submenu__link--active']}`
            : classes.submenu__link
        }
        to={path}
      >
        {description}
      </NavLink>
    </li>
  );
};

export default SideSubMenuItem;
