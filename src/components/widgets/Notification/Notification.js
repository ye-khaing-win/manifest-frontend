import React from "react";

import icons from "../../../images/icons.svg";
import classes from "./Notification.module.scss";

const Notification = ({ icon, count }) => {
  return (
    <div className={classes.notification}>
      <svg className={classes.notification__icon}>
        <use xlinkHref={`${icons}#${icon}`}></use>
      </svg>
      <span className={classes.notification__count}>{count}</span>
    </div>
  );
};

export default Notification;
