import { v4 as uuidv4 } from 'uuid';

const catchError = (error) => {
  console.log(error);
  if (error.response && error.response.data) {
    const res = error.response.data;
    return {
      id: uuidv4(),
      status: 'error',
      message: res.message,
    };
  } else if (error.request && error.request.data) {
    return { id: uuidv4(), status: 'error', ...error.request };
  } else {
    return {
      id: uuidv4(),
      status: 'error',
      code: error.code,
      message: error.message,
    };
  }
};

export default catchError;
