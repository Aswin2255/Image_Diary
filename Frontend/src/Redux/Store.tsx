import { configureStore } from "@reduxjs/toolkit";
import Themeslice from "./Themeslice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import Authslice from "./Authslice";
import Imageslice from "./Imageslice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['Image'],
};
const rootreducer = {
  mode: Themeslice.reducer,
  auth : Authslice.reducer,
  Image : Imageslice.reducer,
};
const persistedreducer = persistCombineReducers(persistConfig, rootreducer);

const store = configureStore({
  reducer: persistedreducer,
});

export default store;
