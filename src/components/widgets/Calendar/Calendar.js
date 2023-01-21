import React, { useState } from 'react';
import Action from '../Action/Action';
import classes from './Calendar.module.scss';
import * as helpers from '../../../utilities/helpers';
import { v4 as uuidv4 } from 'uuid';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ onSelectDate }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isMonthsShown, setIsMonthsShown] = useState(false);

  const currentDate = new Date();
  const firstDay = new Date(year, month, 1);
  const daysOfMonth = [
    31,
    helpers.isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let days = [];
  for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
    if (i >= firstDay.getDay()) {
      days.push(i - firstDay.getDay() + 1);
    } else {
      days.push('');
    }
  }

  const handleClickMonth = () => {
    setIsMonthsShown(true);
  };

  const handleSelectMonth = (selectedMonth) => {
    const monthIndex = months.findIndex((month) => month === selectedMonth);

    setMonth(monthIndex);
    setIsMonthsShown(false);
  };

  const handleClickPrevYear = () => {
    setYear(year - 1);
  };

  const handleClickNextYear = () => {
    setYear(year + 1);
  };

  return (
    <div className={classes.calendar}>
      <header className={classes.calendar__header}>
        <div className={classes.calendar__month} onClick={handleClickMonth}>
          {months[month]}
        </div>
        <div className={classes.calendar__year}>
          <span className={classes.calendar__action}>
            <Action icon={'icon-chevron-left'} onClick={handleClickPrevYear} />
          </span>
          {year}
          <span className={classes.calendar__action}>
            <Action icon={'icon-chevron-right'} onClick={handleClickNextYear} />
          </span>
        </div>
      </header>

      <section className={classes.calendar__content}>
        <ul className={classes.calendar__weekdays}>
          {weekDays.map((weekDay) => (
            <li key={uuidv4()} className={classes.calendar__weekday}>
              {weekDay}
            </li>
          ))}
        </ul>
        <ul className={classes.calendar__days}>
          {days.map((day) => (
            <li
              key={uuidv4()}
              className={
                day !== ''
                  ? day === currentDate.getDate() &&
                    month === currentDate.getMonth() &&
                    year === currentDate.getFullYear()
                    ? `${classes.calendar__day} ${classes['calendar__day--active']}`
                    : classes.calendar__day
                  : null
              }
              onMouseDown={() => {
                onSelectDate(new Date(year, month, day));
              }}
            >
              {day}
            </li>
          ))}
        </ul>
      </section>
      {isMonthsShown && (
        <ul className={classes.calendar__months}>
          {months.map((month) => (
            <li
              key={uuidv4()}
              className={classes.calendar__month}
              onClick={() => {
                handleSelectMonth(month);
              }}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;
