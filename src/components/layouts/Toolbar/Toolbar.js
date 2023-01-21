import React from 'react';
import classes from './Toolbar.module.scss';
import Action from '../../widgets/Action/Action';
import { v4 as uuidv4 } from 'uuid';

const Toolbar = ({ tools, children }) => {
  return (
    <div className={classes.toolbar}>
      <ul className={classes.toolbar__tools}>
        {tools.map((tool) => (
          <li key={uuidv4()} className={classes.toolbar__tool}>
            <Action
              icon={tool.icon}
              onClick={tool.handler}
              action={tool.action}
              isDisabled={tool.isDisabled}
            />
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default Toolbar;
