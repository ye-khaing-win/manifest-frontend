import { createSlice } from '@reduxjs/toolkit';

const slice = (name) => {
  return createSlice({
    name,
    initialState: {
      items: [],
      item: null,
      activeItem: null,
      request: {
        fetchAll: {
          isLoading: false,
          status: null,
        },
        fetchOne: {
          isLoading: false,
          status: null,
        },
        postOne: {
          isLoading: false,
          status: null,
        },
        patchOne: {
          isLoading: false,
          status: null,
        },
        deleteOne: {
          isLoading: false,
          status: null,
        },
      },
    },

    reducers: {
      // GET ALL ITEMS
      getAll(state) {
        state.request.fetchAll.isLoading = true;
        state.request.fetchAll.status = 'loading';
      },
      getAllSuccess(state, action) {
        state.request.fetchAll.isLoading = false;
        state.request.fetchAll.status = 'success';

        const items = action.payload;
        state.items = items;
      },
      getAllFailure(state) {
        state.request.fetchAll.isLoading = false;
        state.request.fetchAll.status = 'fail';
      },

      // GET ITEM
      getOne(state) {
        state.request.fetchOne.isLoading = true;
        state.request.fetchOne.status = 'loading';
      },
      getOneSuccess(state, action) {
        state.request.fetchOne.isLoading = false;
        state.request.fetchOne.status = 'success';

        const item = action.payload;
        state.item = item || null;
      },
      getOneFailure(state) {
        state.request.fetchOne.isLoading = false;
        state.request.fetchOne.status = 'fail';
      },

      // CREATE ITEM
      createOne(state) {
        state.request.postOne.isLoading = true;
        state.request.postOne.status = 'loading';
      },
      createOneSuccess(state, action) {
        state.request.postOne.isLoading = false;
        state.request.postOne.status = 'success';

        const newItem = action.payload;
        state.items.unshift(newItem);
      },
      createOneFailure(state) {
        state.request.postOne.isLoading = false;
        state.request.postOne.status = 'fail';
      },

      // UPDATE ITEM
      updateOne(state) {
        state.request.patchOne.isLoading = true;
        state.request.patchOne.status = 'loading';
      },
      updateOneSuccess(state, action) {
        state.request.patchOne.isLoading = false;
        state.request.patchOne.status = 'success';

        const updatedItem = action.payload;

        const indexOfUpdatedItem = state.items.findIndex(
          (item) => item._id === updatedItem._id
        );

        state.items[indexOfUpdatedItem] = updatedItem;
        state.item = action.payload || null;
      },
      updateOneFailure(state) {
        state.request.patchOne.isLoading = false;
        state.request.patchOne.status = 'fail';
      },

      // DELETE ITEM
      deleteOne(state) {
        state.request.deleteOne.isLoading = true;
        state.request.deleteOne.status = 'loading';
      },
      deleteOneSuccess(state, action) {
        state.request.deleteOne.isLoading = false;
        state.request.deleteOne.status = 'success';

        const deletedItemId = action.payload;

        state.items = state.items.filter((item) => item._id !== deletedItemId);
        state.item = null;
      },
      deleteOneFailure(state) {
        state.request.deleteOne.isLoading = false;
        state.request.deleteOne.status = 'fail';
      },

      // CLEAR ITEMS
      clearAll(state) {
        state.items = [];
      },

      // CLEAR ITEM
      clearOne(state) {
        state.item = null;
      },

      // RESET
      reset(state) {
        state.items = [];
        state.item = null;
        state.activeItem = null;
        state.request = {
          fetchAll: {
            isLoading: false,
            status: null,
          },
          fetchOne: {
            isLoading: false,
            status: null,
          },
          postOne: {
            isLoading: false,
            status: null,
          },
          patchOne: {
            isLoading: false,
            status: null,
          },
          deleteOne: {
            isLoading: false,
            status: null,
          },
        };
      },
    },
  });
};

export default slice;
