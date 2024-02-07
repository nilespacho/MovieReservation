import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
const store = configureStore({
reducer: {
loaders: loadersReducer
},
});
export default store;