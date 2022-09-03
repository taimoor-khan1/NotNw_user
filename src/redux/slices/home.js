import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import getService from '../services/get.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  Categories: [],
  Brands: [],
  ProductList: [],
  banners: [],
  content: null,
};

export const categories = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CATEGORIES,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_ALL_CATEGORIES,
      );
      thunk.dispatch(homeSlice.actions.saveHome(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getBrands = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_BRANDS,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_ALL_BRANDS,
      );
      thunk.dispatch(homeSlice.actions.savebrands(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const ProductList = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PRODUCT,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(CONSTANTS.API_URLS.GET_PRODUCT);
      thunk.dispatch(homeSlice.actions.saveProduct(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getBanners = createAsyncThunk(
  CONSTANTS.API_URLS.GET_BANNERS,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(CONSTANTS.API_URLS.GET_BANNERS);
      thunk.dispatch(homeSlice.actions.saveBanners(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const getContent = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CONTENT,
  async ({}, thunk) => {
    try {
      const response = await getService.getData(CONSTANTS.API_URLS.GET_CONTENT);
      thunk.dispatch(homeSlice.actions.saveContent(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    saveHome: (state, action) => {
      state.Categories = action.payload;
    },
    savebrands: (state, action) => {
      state.Brands = action.payload;
    },
    saveProduct: (state, action) => {
      state.ProductList = action.payload;
    },
    saveBanners: (state, action) => {
      state.banners = action.payload;
    },
    saveContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {saveHome} = homeSlice.actions;
export default homeSlice.reducer;
