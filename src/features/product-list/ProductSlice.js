import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductsFilter,
  fetchCategories,
  fetchBrands,
  fetchProductById,
  createProduct,
  updateProduct,
} from "./productAPI.js";

const initialState = {
  products: [], // Change this to the appropriate initial value
  status: "idle",
  totalItem: 0,
  brands: [],
  categories: [],
  selectProduct: null,
};

export const fetchAllProductsFilterAsync = createAsyncThunk(
  "product/fetchAllProductsFilter",
  async ({ filter, paging, sort }) => {
    const response = await fetchAllProductsFilter({ filter, sort, paging });
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories ",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
//updateProduct
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.products += 1;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProductsFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.products = action.payload.products;
        state.totalItem = action.payload.totalItem;
        // Update the state correctly
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
        // Update the state correctly
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.brands = action.payload;

        // Update the state correctly
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.selectProduct = action.payload;

        // Update the state correctly
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.selectProduct = action.payload;
        console.log(action.payload);
        state.products.push(action.payload);
        // Update the state correctly
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.products.findIndex((p) =>p.id === action.payload.id)
        state.products[index] = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectProduct = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;

export const selectCategories = (state) => state.product.categories;
export const selectedProduct = (state) => state.product.selectProduct;
export const selectedProductListStatus = (state) => state.product.status;

export const selectTotalItem = (state) => state.product.totalItem;

export default productSlice.reducer;
