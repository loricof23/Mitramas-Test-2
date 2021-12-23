import { combineReducers } from "redux";

const dataReducers = (state = {}, action) => {
  if (action.type === 'GET_DATA') {
    return action.payload.data;
  }

  return state;
}

const messageReducer = (state = '', action) => {
  if (action.type === 'SET_MESSAGE') {
    return action.payload;
  }

  return state;
}

export default combineReducers({
  data: dataReducers,
  message: messageReducer,
});