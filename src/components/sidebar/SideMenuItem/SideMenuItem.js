import React, { useState } from 'react';
import icons from '../../../images/icons.svg';
import classes from './SideMenuItem.module.scss';
import SideSubMenu from '../SideSubMenu/SideSubMenu';

const SideMenuItem = ({ icon, description, subs }) => {
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);

  const menuActionClasses = [classes.menu__action];
  const menuDropdownIconClasses = [
    classes.menu__icon,
    classes['menu__icon--dropdown'],
  ];

  isSubMenuShown && menuActionClasses.push(classes['menu__action--active']);
  isSubMenuShown && menuDropdownIconClasses.push(classes['menu__icon--active']);

  const handleClickMenuAction = () => {
    setIsSubMenuShown(!isSubMenuShown);
  };

  return (
    <li className={classes.menu__item}>
      <div
        className={menuActionClasses.join(' ')}
        onClick={handleClickMenuAction}
      >
        <svg className={classes.menu__icon}>
          <use xlinkHref={`${icons}#${icon}`}></use>
        </svg>
        {description}
        <svg className={menuDropdownIconClasses.join(' ')}>
          <use xlinkHref={`${icons}#icon-chevron-down`}></use>
        </svg>
      </div>

      {isSubMenuShown && <SideSubMenu subs={subs} />}
    </li>
  );
};

export default SideMenuItem;
