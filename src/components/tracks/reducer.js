import { FETCH_TRACKS } from "./types";
const INITIAL_STATE = {
  tracks: [],
};

const trackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
};
export default trackReducer;
