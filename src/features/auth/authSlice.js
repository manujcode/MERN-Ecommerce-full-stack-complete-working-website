import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';
// import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null,
};


export const createUserDataAsyc = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
    
  }
);
export const checkUserDataAsyc = createAsyncThunk(
  'user/checkUser',
  async (loggedData) => {
    const response = await checkUser(loggedData);
    return response.data;
     
  }
);
export const signOutAsyc = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    return response.data;
     
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserDataAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserDataAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserDataAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserDataAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserDataAsyc.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
     
  },
});



// export const selectCount = (state) => state.counter.value;

export const selectLoggedInUser =(state)=>state.auth.loggedInUser
export const selectError =(state)=>state.auth.error


export default authSlice.reducer;
