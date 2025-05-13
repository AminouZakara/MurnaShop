import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load cart from AsyncStorage
export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  const cartData = await AsyncStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
});

//
export const addItemToCart = (item) => (dispatch, getState) => {
  dispatch(cartSlice.actions.addToCart(item));
  
  const cartItems = getState().cart.items;
  AsyncStorage.setItem("cart", JSON.stringify(Array.isArray(cartItems) ? cartItems : []));
};


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      AsyncStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      AsyncStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
        AsyncStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    });
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;