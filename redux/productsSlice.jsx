// features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const snapshot = await getDocs(collection(db, 'murnaShoppingPosts'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;