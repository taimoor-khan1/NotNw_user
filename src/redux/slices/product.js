import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import postService from '../services/post.service';
import getService from '../services/get.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  favoriteProducts: [],
};

export const getFavoriteProducts = createAsyncThunk(
  CONSTANTS.API_URLS.GET_FAVOURITES,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_FAVOURITES,
      );
      thunk.dispatch(productSlice.actions.saveFavorites(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const onMarkFavorite = createAsyncThunk(
  CONSTANTS.API_URLS.MARK_FAVOURITE,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.MARK_FAVOURITE,
        data,
      );
      thunk.dispatch(getFavoriteProducts(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getProductDetail = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PRODUCT_DETAILS,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_PRODUCT_DETAILS,
        params,
      );
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getFilteredProducts = createAsyncThunk(
  CONSTANTS.API_URLS.FILTER_PRODUCTS,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.FILTER_PRODUCTS,
        params,
      );
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getProductsByCategory = createAsyncThunk(
  CONSTANTS.API_URLS.PRODUCTS_BY_CATEGORY,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.PRODUCTS_BY_CATEGORY,
        params,
      );
      return response.data;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getProductsByBrand = createAsyncThunk(
  CONSTANTS.API_URLS.PRODUCTS_BY_BRAND,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.PRODUCTS_BY_BRAND,
        params,
      );
      return response.data;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

const productSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveFavorites: (state, action) => {
      state.favoriteProducts = action.payload;
    },
  },
});

export const {saveFavorites} = productSlice.actions;
export default productSlice.reducer;
