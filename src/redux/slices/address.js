import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import postService from '../services/post.service';
import getService from '../services/get.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  deliveryAddress: null,
  addressList: [],
};

export const getAddress = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ADDRESS,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_ADDRESS,
        params,
      );
      thunk.dispatch(addressSlice.actions.saveAddressList(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const createAddress = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_ADDRESS,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.CREATE_ADDRESS,
        data,
      );
      thunk.dispatch(getAddress(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const updateAddress = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_ADDRESS,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.UPDATE_ADDRESS,
        data,
      );
      thunk.dispatch(getAddress(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ADDRESS,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.DELETE_ADDRESS,
        params,
      );
      thunk.dispatch(getAddress(''));
      thunk.dispatch(
        addressSlice.actions.removeDeliveryAddress(params.addressId),
      );
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    saveDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    removeDeliveryAddress: (state, action) => {
      const _id = action.payload;
      if (state.deliveryAddress._id === _id) {
        state.deliveryAddress = null;
      }
    },
  },
});

export const {saveAddressList, saveDeliveryAddress} = addressSlice.actions;
export default addressSlice.reducer;
