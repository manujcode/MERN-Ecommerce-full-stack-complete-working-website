import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrders, fetchOrdersByFilter, updateOrder } from "./orderAPI";

const initialState = {
  orders:[],
  status: "idle", 
  currentOrder:null,
  totalOrders:0,
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsyc = createAsyncThunk(
  "order/fetchAllOrdes",
  async (paging) => {
    const response = await fetchAllOrders(paging);
    return response.data;
  }
);
export const updateOrderAsyc = createAsyncThunk(
  "order/updateOrder",
  async (update) => {
    const response = await updateOrder(update);
    return response.data;
  }
);
export const fetchOrdersByFilterAsyc = createAsyncThunk(
  "order/fetchOrdersByFilter",
  async (update) => {
    const response = await fetchOrdersByFilter(update);
    return response.data;
  }
);
//fetchOrdersByFilter

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(fetchAllOrdersAsyc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsyc.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders=action.payload.orders;
        console.log("hbkhub",action.payload)
        state.totalOrders =action.payload.totalOrders
      })
      .addCase(updateOrderAsyc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsyc.fulfilled, (state, action) => {
        state.status = "idle";
          const index= state.orders.findIndex(order=>order.id===action.payload.id)
          state.orders[index]=action.payload
      })
      .addCase(fetchOrdersByFilterAsyc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByFilterAsyc.fulfilled, (state, action) => {
        state.status = "idle";
          state.orders=action.payload;
      })
      ;
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selecttotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;





