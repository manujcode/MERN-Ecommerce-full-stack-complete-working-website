import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from './userAPI';

const initialState = {
  userOrder:[],
  status: 'idle',
  userInfo:null,
};


export const fetchLoggedInUserOrderAsyc = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    return response.data;
  }
);
export const fetchLoggedInUserAsyc = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);
export const updateUserAsyc = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
     
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder=action.payload;
      })
      .addCase(updateUserAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});



export const selectUserOrder = (state) => state.user.userOrder ;
export const selectUserInfo = (state) => state.user.userInfo ;



export default userSlice.reducer;
