import { configureStore, createSlice } from "@reduxjs/toolkit";
import User from "../models/User";

export interface storeDetails {
  user: User;
  isAuthetificated: boolean;
}
const initialUserState = {
  user: null,
  isAuthetificated: false,
};
const UserReducer = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    signin(state, action) {
      state.user = action.payload;
      state.isAuthetificated = true;
      console.log(action.payload);
      
    },
    logout(state, action) {
      state.user = null;
      state.isAuthetificated = false;
    },
  },
});
const store = configureStore({
  reducer: UserReducer.reducer,
});
export const UserAction = UserReducer.actions;
export default store;
