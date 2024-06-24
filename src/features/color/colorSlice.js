import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorService } from "./colorService";
export const getColors = createAsyncThunk(
    "gte/colors",
    async (thunkAPI) => {
        try {
            return await colorService.getAllColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const colorState = {
    colors: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const colorSlice = createSlice({
    name: "color",
    initialState: colorState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true;
        }).addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
            state.message = "colors got successfully";
        }).addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    },
});

export default colorSlice.reducer;
