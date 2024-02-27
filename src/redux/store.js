import { legacy_createStore } from "redux";
import loginReducer from "./reducers/loginReducer";

export const store = legacy_createStore(loginReducer);
