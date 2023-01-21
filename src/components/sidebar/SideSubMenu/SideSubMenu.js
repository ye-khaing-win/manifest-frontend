import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideSubmenuItem from '../SideSubMenuItem/SideSubMenuItem';
import classes from './SideSubMenu.module.scss';

const SideSubMenu = ({ subs }) => {
  return (
    <ul className={classes.submenu}>
      {subs.map((subItem) => (
        <SideSubmenuItem key={uuidv4()} {...subItem} />
      ))}
    </ul>
  );
};

export default SideSubMenu;
