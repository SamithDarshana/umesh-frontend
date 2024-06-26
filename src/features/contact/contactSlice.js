import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from 'react-toastify';
export const createEnquiry = createAsyncThunk(
    "enquiry/post",
    async (contactData, thunkAPI) => {
        try {
            return await contactService.postEnquiry(contactData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const contactState = {
    enquiry: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEnquiry.pending, (state) => {
            state.isLoading = true;
        }).addCase(createEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiry = action.payload;
            state.message = "enquiry created";
            if (state.isSuccess === true) {
                toast.success('Contact form submitted successfully!')
            }
        }).addCase(createEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.success('Something went wrong!')
            }
        })
    },
});

export default contactSlice.reducer;
