import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/Slice';
import passengersReducer from './Passengers/Slice';



export const store = configureStore({
  reducer: {
    user: userReducer,
    passengers: passengersReducer
  },
});