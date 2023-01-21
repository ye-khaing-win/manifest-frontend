import { toastActions } from '../store/userInterface/toastSlice';
import catchError from './catchError';
import * as api from './api';
import { v4 as uuidv4 } from 'uuid';
import * as helpers from './helpers';

// eslint-disable-next-line no-undef
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getAll =
  (url, actions) =>
  (query = '') =>
  async (dispatch) => {
    try {
      // SET IS LOADING
      dispatch(actions.clearAll());
      dispatch(actions.getAll());

      const { data } = await api.fetchAll(
        `${SERVER_URL}${url}${helpers.isEmptyString(query) ? '' : `?${query}`}`
      );

      // GET SUCCEED
      dispatch(actions.getAllSuccess(data.data));
    } catch (error) {
      // GET FAILED
      const err = catchError(error);
      dispatch(toastActions.add(err));
      dispatch(actions.getAllFailure());
    }
  };

export const getOne = (url, actions) => (id) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(actions.clearOne());
    dispatch(actions.getOne());

    const { data } = await api.fetchOne(`${SERVER_URL}${url}`, id);

    // GET SUCCEED
    dispatch(actions.getOneSuccess(data.data));
  } catch (error) {
    // GET FAILED
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(actions.getOneFailure());
  }
};

export const createOne = (url, actions) => (newItem) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(actions.createOne());

    const { data } = await api.postOne(`${SERVER_URL}${url}`, newItem);

    // GET SUCCEED
    dispatch(actions.createOneSuccess(data.data));
    dispatch(
      toastActions.add({
        id: uuidv4(),
        status: 'success',
        message: 'New item has been added!',
      })
    );
  } catch (error) {
    // GET FAILED
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(actions.createOneFailure());
  }
};

export const updateOne =
  (url, actions) => (id, updatedItem) => async (dispatch) => {
    try {
      // SET IS LOADING
      dispatch(actions.updateOne());

      const { data } = await api.patchOne(
        `${SERVER_URL}${url}`,
        id,
        updatedItem
      );

      // GET SUCCEED
      dispatch(actions.updateOneSuccess(data.data));
      dispatch(
        toastActions.add({
          id: uuidv4(),
          status: 'success',
          message: 'Item has been updated!',
        })
      );
    } catch (error) {
      // GET FAILED
      const err = catchError(error);
      dispatch(toastActions.add(err));
      dispatch(actions.updateOneFailure());
    }
  };

export const deleteOne = (url, actions) => (id) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(actions.deleteOne());
    await api.deleteOne(`${SERVER_URL}${url}`, id);

    // GET SUCCEED
    dispatch(actions.deleteOneSuccess(id));
    dispatch(
      toastActions.add({
        id: uuidv4(),
        status: 'success',
        message: 'Item has been deleted!',
      })
    );
  } catch (error) {
    // GET FAILED
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(actions.deleteOneFailure());
  }
};

export const getActiveOne = (url, actions) => (id) => async (dispatch) => {
  try {
    // SET IS LOADING
    dispatch(actions.getActiveOne());

    const { data } = await api.fetchOne(`${SERVER_URL}${url}`, id);

    // GET SUCCEED
    dispatch(actions.getActiveOneSuccess(data.data));
  } catch (error) {
    // GET FAILED
    const err = catchError(error);
    dispatch(toastActions.add(err));
    dispatch(actions.getActiveOneFailure());
  }
};
