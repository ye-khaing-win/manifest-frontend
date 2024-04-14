import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideSubmenuItem from '../SideMenuItem/SideMenuItem';
import menuItems from '../sidebar.json';
import classes from './SideMenu.module.scss';

const SideMenu = () => {
  return (
    <nav className={classes.menu}>
      <ul className={classes.menu__items}>
        {menuItems.map((menuItem) => (
          <SideSubmenuItem key={uuidv4()} {...menuItem} />
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
