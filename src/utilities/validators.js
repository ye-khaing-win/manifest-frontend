import { isEmptyString } from './helpers';

export const validateIsEmpty = (value) => {
  return [!isEmptyString(value), 'must not be empty!'];
};

export const validateIsNumber = (value) => {
  return [/^\d*\.?\d*$/.test(value), 'must be Nos!'];
};

export const validateFixedLength = (length) => (value) => {
  return [
    String(value).length === length,
    `must have only ${length} characters!`,
  ];
};
