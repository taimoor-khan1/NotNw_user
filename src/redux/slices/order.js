import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import postService from '../services/post.service';
import getService from '../services/get.service';
import {CONSTANTS} from '../../constants';
import {ProductList} from './home';
import {store} from '../store';
import utils from '../../utils';

const initialState = {
  orders: [],
};

export const getAllOrders = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ORDERS,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(CONSTANTS.API_URLS.GET_ORDERS, {
        customerId: store?.getState()?.profile?.profile?._id,
      });
      console.log('response: ', response);
      thunk.dispatch(orderSlice.actions.saveOrders(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const submitOrder = createAsyncThunk(
  CONSTANTS.API_URLS.PLACE_ORDER,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.PLACE_ORDER,
        data,
      );
      thunk.dispatch(getAllOrders(''));
      thunk.dispatch(ProductList(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {saveOrders} = orderSlice.actions;
export default orderSlice.reducer;
