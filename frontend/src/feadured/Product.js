import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductBySku = createAsyncThunk(
    'products/fetchProductBySku',
    async (sku, { rejectWithValue }) => {
      try {
        // console.log(sku)
        const response = await axios.get(`http://127.0.0.1:8000/products/by_sku/?sku=${sku}`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : "Something went wrong");
      }
    }
  );

// const productSlice = createSlice({
//   name: 'product',
//   initialState: {
//     items: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProductBySku.pending, (state) => {
//         state.status = 'loading';
//         state.product = null;
//         state.error = null;
//       })
//       .addCase(fetchProductBySku.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//         // console.log(state.items)
//       })
//       .addCase(fetchProductBySku.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || 'Failed to fetch product.';
//       });
//   },
// });

// export default productSlice.reducer;
