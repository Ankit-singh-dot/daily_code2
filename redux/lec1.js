import { createStore } from "redux";
import { ProductList } from "./productList";
const initialState = {
  products: ProductList,
  cartItems: [],
  wishList: [],
};
const CART_ADD_ITEM = "cart/addItem";
const CART_REMOVE_ITEM = "cart/removeItem";
const CART_ITEM_INCREASE_QUANTITY = "cart/increaseItemQuantity";

function reducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => {
          return cartItem.productId !== action.payload.productId;
        }),
      };
    case CART_ITEM_INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          if (cartItem.productId === action.payload.productId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        }),
      };
    default:
      return state;
  }
}
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store);
store.dispatch({
  type: CART_ADD_ITEM,
  payload: { productId: 1, quantity: 1 },
});
store.dispatch({
  type: CART_ADD_ITEM,
  payload: { productId: 15, quantity: 1 },
});
store.dispatch({
  type: CART_ADD_ITEM,
  payload: { productId: 34, quantity: 1 },
});

store.dispatch({
  type: CART_REMOVE_ITEM,
  payload: { productId: 15 },
  quantity: 1,
});
store.dispatch({
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 1 },
  quantity: 1,
});
store.dispatch({
  type: CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 1 },
  quantity: 1,
});
