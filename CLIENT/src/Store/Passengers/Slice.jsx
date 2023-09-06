import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    passengers: [],
};

const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        setPassengers(state, action) {
            state.passengers = action.payload;
        }
    },
});

export const { setPassengers } = passengersSlice.actions;
export default passengersSlice.reducer;
