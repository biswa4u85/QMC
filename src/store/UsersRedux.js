import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { apiGetCall, apiPostCall, apiPutCall, apiDeleteCall } from '../utility/site-apis'

const initialState = {
    isFetching: false,
    error: null,
    formValues: {},
    dataLists: [],
    singleData: null,
    isEditData: false,
}

export const feachAllData = createAsyncThunk(
    'users/feachAllData',
    async (params, { rejectWithValue }) => {
        params.enable = "true"
        const response = await apiGetCall(`/user/search`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const feachSingleData = createAsyncThunk(
    'users/feachSingleData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/user/search`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        let data = response?.data?.data[0] ? response.data.data[0] : null
        return data ? { ...data, ...data.profile } : null
    }
)

export const addNewData = createAsyncThunk(
    'users/addNewData',
    async (params, { rejectWithValue }) => {
        const response = await apiPostCall(`/user/verifyUser`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const editData = createAsyncThunk(
    'users/editData',
    async (params, { rejectWithValue }) => {
        const response = await apiPutCall(`/user`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const deleteData = createAsyncThunk(
    'users/deleteData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/user/disable/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return params
    }
)

export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetAllData: (state) => {
            state.dataLists = []
        },
        resetSingleData: (state, action) => {
            state.singleData = action?.payload
        },
        setFormValues: (state, action) => {
            state.formValues = action?.payload
        },
    },
    extraReducers: {
        // All Data List
        [feachAllData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.dataLists = []
        },
        [feachAllData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachAllData.fulfilled]: (state, action) => {
            state.isFetching = false
            state.error = null
            state.dataLists = action?.payload
        },
        // All Data List
        [feachSingleData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.singleData = null
        },
        [feachSingleData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachSingleData.fulfilled]: (state, action) => {
            state.isFetching = false
            state.error = null
            state.singleData = action?.payload
        },
        // Add New Data
        [addNewData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.isEditData = false
        },
        [addNewData.rejected]: (state, action) => {
            state.isFetching = false
            state.isEditData = false
            state.error = action?.payload
        },
        [addNewData.fulfilled]: (state, action) => {
            message.success(`Data Added Successfully`);
            state.isFetching = false
            state.error = null
            state.isEditData = true
            state.dataLists = { ...state.dataLists, data: [...state.dataLists.data, action.payload] }
        },
        // Edit Data
        [editData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.isEditData = false
        },
        [editData.rejected]: (state, action) => {
            state.isFetching = false
            state.isEditData = false
            state.error = action?.payload
        },
        [editData.fulfilled]: (state, action) => {
            message.success(`Data Edit Successfully`);
            state.isFetching = false
            state.error = null
            state.isEditData = true
            let data = state.dataLists.data.filter(item => (item._id !== action?.payload?._id));
            state.dataLists = { ...state.dataLists, data: [...data, action.payload] }
        },
        // Delete Data
        [deleteData.pending]: (state) => {
            state.isFetching = true
            state.error = null
        },
        [deleteData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [deleteData.fulfilled]: (state, action) => {
            message.success(`Successfully update the record`);
            state.isFetching = false
            state.error = null
            // let totalCount = state.dataLists.totalCount - 1
            // state.dataLists = { ...state.dataLists, data, totalCount }
        },
    }

})

export const { resetAllData, resetSingleData, setFormValues } = counterSlice.actions
export default counterSlice.reducer