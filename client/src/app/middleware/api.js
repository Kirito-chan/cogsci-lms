import axios from "axios";
import * as actions from "../actions";
import { anyErrorReceived, getTokenHeaders } from "../currentUserSlice";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    headers,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  const newHeaders = { ...getTokenHeaders(), ...headers };

  next(action);
  let response = null;
  try {
    response = await axios.request({
      baseURL: process.env.REACT_APP_API_URL,
      url,
      method,
      data,
      headers: newHeaders,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) return dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));

    dispatch({ type: anyErrorReceived.type, payload: error.response?.data });

    // Specific
    if (onError) {
      const customMessage = error.response?.data || "";

      dispatch({
        type: onError,
        payload: {
          message: error.message,
          customMessage: customMessage,
        },
      });
    }
  }
};

export default api;
