import { useState } from 'react';
import { isEmptyString } from '../utilities/helpers';
import * as helpers from '../utilities/helpers';

const useSelect = (
  label,
  options = [],
  initialId = '',
  initialValue = '',
  initialDetails = {}
) => {
  const [id, setId] = useState(initialId);
  const [value, setValue] = useState(initialValue);
  const [details, setDetails] = useState(initialDetails);
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const filteredOptions = !helpers.isEmptyArray(options)
    ? options.filter((option) =>
        option.value.toLowerCase().startsWith(value.toLowerCase())
      )
    : [];

  let isValid = isSelected;

  if (!isEmptyString(initialValue) && !isTouched) isValid = true;

  const hasError = !isValid && isTouched && !isOptionsShown;

  if (hasError) label = 'Please select a valid input';

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsTouched(true);
    setIsSelected(false);
  };

  const handleSelect = (option) => {
    setId(option.id);
    setValue(option.value);
    setDetails(option.details);
    setIsSelected(true);
    setIsTouched(true);
    setIsOptionsShown(false);
  };

  const handleClick = () => {
    setId('');
    setValue('');
    setDetails({});
    setIsSelected(false);
    setIsOptionsShown(!isOptionsShown);
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsOptionsShown(false);
    setIsTouched(true);
  };

  const touch = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setId('');
    setValue('');
    setIsSelected(false);
    setIsTouched(false);
  };

  return {
    type: 'select',
    label,
    id,
    value,
    details,
    isTouched,
    options: filteredOptions,
    isOptionsShown,
    isValid,
    hasError,
    onChange: handleChange,
    onSelect: handleSelect,
    onClick: handleClick,
    onBlur: handleBlur,
    touch,
    reset,
  };
};

export default useSelect;
