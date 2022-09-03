import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import postService from '../services/post.service';
import getService from '../services/get.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  cardList: [],
};

export const getCards = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CARDS,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.GET_CARDS,
        params,
      );
      thunk.dispatch(cardSlice.actions.saveCardList(response.data));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const createCard = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_CARD,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.CREATE_CARD,
        data,
      );
      thunk.dispatch(getCards(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const updateCardStatus = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_CARD_STATUS,
  async (data, thunk) => {
    try {
      const response = await postService.postData(
        CONSTANTS.API_URLS.UPDATE_CARD_STATUS,
        data,
      );
      thunk.dispatch(getCards(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

export const deleteCard = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_CARD,
  async (params, thunk) => {
    try {
      const response = await getService.getData(
        CONSTANTS.API_URLS.DELETE_CARD,
        params,
      );
      thunk.dispatch(getCards(''));
      return response;
    } catch (error) {
      throw utils.showResponseError(error);
    }
  },
);

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    saveCardList: (state, action) => {
      state.cardList = action.payload;
    },
  },
});

export const {saveCardList} = cardSlice.actions;
export default cardSlice.reducer;
