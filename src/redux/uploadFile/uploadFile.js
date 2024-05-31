import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_UPLOAD = "https://fams-management.tech/api/files";

export const uploadFileImage = createAsyncThunk('uploadFileImage', async (file) => {
    try {
        const token = localStorage.getItem('token');
        console.log("File anh o day: ", file)
        const config = {
            headers: {
                'Custom-Header': 'value',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post(URL_UPLOAD, file, config)
        console.log("Redux: ", response.data)
        return response.data
    } catch (error) {
        throw (error)
    }
})

export const UploadData = createSlice({
    name: 'UploadData',
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(uploadFileImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload
        })
            .addCase(uploadFileImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadFileImage.rejected, (state) => {
                state.isError = true;
            })
    }
})

export default UploadData.reducer