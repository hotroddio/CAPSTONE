import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      //to check if the item is already available
      const existingItem = state.itemsList.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItem !== -1) {
        state.itemsList[existingItem].quantity++;
        state.itemsList[existingItem].price += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
          image: newItem.image,
        });
      }
    },
    removeFromCart(state, action) {
      const itemIdToRemove = action.payload;
      state.itemsList = current(state.itemsList).filter(
        (item) => item.id !== itemIdToRemove * 1
      );
    },
    adjustQuantityFromCart(state, action) {
      const { itemId, newQuantity } = action.payload;
      const itemIndex = state.itemsList.findIndex(
        (item) => item.id === itemId * 1
      );
      const updatedItemsList = [...state.itemsList]; // Create a new copy
      if (itemIndex !== -1 && newQuantity > 0) {
        updatedItemsList[itemIndex].quantity = newQuantity;
        state.itemsList = updatedItemsList; // Return a new state object
      } else if (itemIndex !== -1) {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== updatedItemsList[itemIndex].id
        );
      }
      return state; // No change if conditions not met
    },
    updateTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    setShowCart(state) {
      state.showCart = true;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  adjustQuantityFromCart,
  updateTotalQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
