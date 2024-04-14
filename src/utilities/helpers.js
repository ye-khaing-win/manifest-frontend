export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

export const isEmptyString = (str) => {
  return String(str).trim() === '';
};

export const isEmptyArray = (arr) => {
  return arr.length === 0;
};

export const isUrlString = (str) => {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
    str
  );
};

export const parseToString = (value) => {
  return value ? String(value) : '';
};

export const parseCamelToTitle = (str) => {
  return `${str[0].toUpperCase()}${str.replace(/([A-Z])/g, ' $1').slice(1)}`;
};

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const extractString = (str, start, end) => {
  return String(str)?.split(start)[1]?.split(end)[0] || null;
};

export const extractNextChars = (str, start, length = 20) => {
  return (
    String(str).toLowerCase().split(start)[1]?.substring(0, length) || null
  );
};

export const extractOnlyNumbers = (str) => {
  return String(str).replace(/\D/g, '');
  // return str.replace(/^\d*\.?(?:\d{1,2})?$/);
};

export const extractDecimalNumber = (str = '') => {
  return String(str).match(/\d+\.*\d*/)[0];
};

export const hasHsCode = (str) => {
  return (
    str.trim().toLowerCase().includes('h.s.') ||
    str.trim().toLowerCase().includes('hs:') ||
    str.trim().toLowerCase().includes('hs :') ||
    ((str.trim().toLowerCase().includes('h.s') ||
      str.trim().toLowerCase().includes('hs') ||
      str.trim().toLowerCase().includes('h s') ||
      str.trim().toLowerCase().includes('h. s.') ||
      str.trim().toLowerCase().includes('harmonized')) &&
      str.trim().toLowerCase().includes('code'))
  );
};

export const removeWhiteSpaces = (str) => {
  return str.replace(/\s/g, '');
};

export const isContainerNumber = (str) => {
  return /([a-zA-Z]{3})([UJZujz])(\d{6})(\d)/.test(str);
};

// export const checkContainerType = (str) => {
//   return str.startsWith('DRY') ? str.slice(3, 7) : str;
// };

export const hasNumbers = (str) => {
  return /\d/g.test(str);
};

export const sliceWords = (str, length) => {
  return str.split(/\s+/).slice(0, length).join(' ');
};

// export const formatDate = (date, format = 'mm-dd-yyyy h:MM:ss') => {
//   return dateFormat(date, format);
// };
