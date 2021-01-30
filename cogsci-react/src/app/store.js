import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice'
import api from './middleware/api'
import featuresReducer from './features'


export default configureStore({
  reducer: {
    features: featuresReducer,
    currentUser: currentUserReducer
  },
  
  middleware: [
    ...getDefaultMiddleware(),
    api
  ]
});
