import { useState } from 'react';

const useInput = (label, initialValue = '', validate = null) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  let isValid = true;
  let errorMessage = '';

  if (validate) {
    [isValid, errorMessage] = validate(value);
  }

  const hasError = !isValid && isTouched;

  if (hasError) label = `${label} ${errorMessage}`;

  const handleChange = (e) => {
    setIsTouched(true);
    setValue(e.target.value);
  };

  const handleBlur = () => {
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
    isTouched,
    isValid,
    errorMessage,
    hasError,
    onChange: handleChange,
    onBlur: handleBlur,
    touch,
    reset,
  };
};

export default useInput;
