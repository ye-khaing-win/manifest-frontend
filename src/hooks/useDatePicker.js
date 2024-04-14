import { useState } from 'react';
import * as helpers from '../utilities/helpers';
import { validateIsDate } from '../utilities/validators';

const useDatePicker = (label, initialDate, initialValue = '') => {
  const [date, setDate] = useState(initialDate);
  const [value, setValue] = useState(initialValue);
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  let isValid = validateIsDate(value);

  const hasError = !isValid && isTouched && !isCalendarShown;

  if (hasError) label = 'Please select a date!';

  const handleChange = (e) => {
    setIsTouched(true);
    setValue(e.target.value);
  };

  const handleClick = () => {
    setValue('');
    setIsCalendarShown(!isCalendarShown);
    setIsTouched(true);
  };

  const handleSelect = (date) => {
    setValue(helpers.formatDate(date));
    setIsTouched(true);
    setIsCalendarShown(false);
  };

  const handleBlur = (e) => {
    setIsCalendarShown(false);
    setIsTouched(true);
  };

  const touch = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    label,
    value,
    isCalendarShown,
    isValid,
    hasError,
    onChange: handleChange,
    onClickCalendar: handleClick,
    onSelect: handleSelect,
    onBlur: handleBlur,
    touch,
    reset,
    isDatePicker: true,
  };
};

export default useDatePicker;
