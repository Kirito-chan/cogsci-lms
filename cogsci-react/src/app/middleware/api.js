import axios from "axios";
import * as actions from "../apiConstants";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  let response = null;
  try {
    response = await axios.request({
      baseURL: process.env.REACT_APP_API_URL,
      url: url,
      method: method,
      data: data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) {
      console.log(error);
      dispatch({ type: onError, payload: error.message });
    }
  }
};

export default api;
