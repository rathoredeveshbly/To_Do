import { combineReducers } from "redux";
import friendReducer from "./friendReducer";

const reducers = combineReducers({
    friendList: friendReducer
})

export default reducers