import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    currency: 'usd',
    cart: { 
      items: { },
      totalQuantity: 0,
      totalSum: 0,
    },
    isLogined: null,
    userName: "",
    userId: "",
    succesOrder: false,
    delivery: 3,
    history: [],
    existHistory: false,
    pizzas:[],
    loading: true,
};

const storageState = window.localStorage.getItem('state');
const initialState = storageState? JSON.parse(storageState).main : defaultState;

const mainSlice = createSlice({
  name: 'main',
  initialState, 
  reducers: {
    setCurrency(state,action) {
      state.currency = action.payload;
    },
    addItemToCart(state,action) {
      const {name, priceUSD, priceEUR, id, img } = action.payload;
        if(state.cart.items[id]) {
          state.cart.items[id].quantity++;
        } else {
          state.cart.items[id] = {
            name,
            priceUSD,
            priceEUR,
            id,
            quantity: 1,
            img
          }
        }
    },
    decreaseItemQuantity(state,action) {
      const {name, priceUSD, priceEUR, id, img } = action.payload;
        if(state.cart.items[id]) {
          state.cart.items[id].quantity--;
        }
    },
    isLogined(state,action) {
      state.isLogined = action.payload;
    },
    setTotalQuantity(state,action) {
      state.cart.totalQuantity = action.payload;
    },
    setTotalSumOfOrder(state,action) {
      state.cart.totalSum = action.payload;
    },
    setUserName(state,action) {
      state.userName = action.payload;
    },
    succesOrderDone(state,action) {
      state.succesOrder = action.payload;
    },
    clearCart(state, action) {
      state.cart.items = action.payload; 
    },
    setUserId(state,action) {
      state.userId = action.payload;
    },
    existHistory(state,action) {
      state.existHistory = action.payload;
    },
    addHistory(state,action) {
      state.history = action.payload;
    },
    removeItemFromCart(state, action) {
      const {name, priceUSD, priceEUR, id, img } = action.payload;
      // state.delivery = id;
      delete state.cart.items[id];
    }, 
    setPizzaFromDB(state,action) {
      state.pizzas = action.payload;
    },
    setLoadingState(state, action) {
      state.loading = action.payload;
    }
  }
})

export const { setCurrency, addItemToCart, isLogined, setTotalQuantity, setTotalSumOfOrder, setUserName, succesOrderDone, clearCart, decreaseItemQuantity, setUserId, existHistory, addHistory, removeItemFromCart, setPizzaFromDB, setLoadingState } = mainSlice.actions;
export const mainReducer = mainSlice.reducer;
