import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  item: [],
  status: 'idle',
};


export const addToCartAsyc = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemByUserIdAsyc = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);
//updateCart
export const updateCartAsyc = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsyn = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);
export const resetCartAsyc = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
    console.log("xxxxx4")
  }
);
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      
      state.value += 1;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        state.item=action.payload;
      })
      .addCase(updateCartAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.item.findIndex(x=>x.id===action.payload.id)
        state.item[index]=action.payload;
      })
      .addCase(deleteItemFromCartAsyn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsyn.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.item.findIndex(x=>x.id===action.payload.id)
        state.item.splice(index,1)
      })
      .addCase(resetCartAsyc.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsyc.fulfilled, (state, action) => {
        state.status = 'idle';
          state.item=[]
      });
  },
});

export const { increment } = cartSlice.actions;


export const selectCart = (state) => state.cart.item;
export const selectCartStatus = (state) => state.cart.status;


export default cartSlice.reducer;
