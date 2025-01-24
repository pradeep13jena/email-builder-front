import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./templateSlice.js"
import sethtmlContentReducer from "./htmlContentSlice.js"
import selectReducer from "./selectedItemSlice.js";

export default configureStore({
  reducer : {
    template: templateReducer,
    htmlContentSlice: sethtmlContentReducer,
    SelectedItem : selectReducer, 
  },
})