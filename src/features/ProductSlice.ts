import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../interfaces/product";

const API_URL = "http://localhost:5000";

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products" + error);
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk<Product, Product>(
  "products/addProduct",
  async (product: Product) => {
    try {
      const response = await axios.post(`${API_URL}/products`, product);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add product" + error);
    }
  }
);

export const deleteProduct = createAsyncThunk<void, number>(
  "products/deleteProduct",
  async (id: number) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
      throw new Error("Failed to delete product" + error);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "products/updateProduct",
  async (product: Product) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${product.id}`,
        product
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update product" + error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      });
  },
});

export default productSlice.reducer;
