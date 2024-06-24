import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";

export const getCategories = createAsyncThunk(
    "gte/categories",
    async (thunkAPI) => {
        try {
            return await categoryService.getAllCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const categoryState = {
    categories: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const categorySlice = createSlice({
    name: "category",
    initialState: categoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categories = action.payload;
            state.message = "categories got successfully";
        }).addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    },
});

export default categorySlice.reducer;
