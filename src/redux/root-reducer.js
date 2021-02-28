import { combineReducers } from "redux";
import trackReducer from "../components/tracks/reducer";

const rootReducer = combineReducers({
  tracks: trackReducer,
});
export default rootReducer;
