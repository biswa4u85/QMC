import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';
import { apiGetCall, apiPostCall, apiPutCall, apiDeleteCall } from '../utility/site-apis'

const initialState = {
    isFetching: false,
    error: null,
    formValues: {},
    dataLists: {},
    singleData: null,
    isEditData: false,
}

export const feachAllHashtagData = createAsyncThunk(
    'hashtag/feachAllHashtagData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/hashtags`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const feachSingleData = createAsyncThunk(
    'hashtag/feachSingleData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/hashtags`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        let data = response?.data?.data[0] ? response.data.data[0] : null
        data['brandLists'] = data.brands
        data['influencerLists'] = data.influencers

        let newinfluencers = []
        for (let item of data.influencers) {
            newinfluencers.push(item._id)
        }
        data['influencers'] = newinfluencers

        let newbrands = []
        for (let item of data.brands) {
            newbrands.push(item._id)
        }
        data['brands'] = newbrands

        return data
    }
)

export const addNewData = createAsyncThunk(
    'hashtag/addNewData',
    async (params, { rejectWithValue }) => {
        const response = await apiPostCall(`/hashtags`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const editData = createAsyncThunk(
    'hashtag/editData',
    async (params, { rejectWithValue }) => {
        const response = await apiPutCall(`/hashtags/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const deleteData = createAsyncThunk(
    'hashtag/deleteData',
    async (params, { rejectWithValue }) => {
        const response = await apiDeleteCall(`/hashtags/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return params
    }
)

export const counterSlice = createSlice({
    name: 'hashtag',
    initialState,
    reducers: {
        setAllHashtagsData: (state, action) => {
            state.dataLists = { data: action?.payload }
        },
        resetAllData: (state) => {
            state.dataLists = {}
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
        [feachAllHashtagData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.dataLists = {}
        },
        [feachAllHashtagData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachAllHashtagData.fulfilled]: (state, action) => {
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
            message.success(`Successfully delete the record`);
            state.isFetching = false
            state.error = null
            let data = state.dataLists.data.filter(item => (item._id !== action?.payload?._id));
            let totalCount = state.dataLists.totalCount - 1
            state.dataLists = { ...state.dataLists, data, totalCount }
        },
    }

})

export const { resetAllData, resetSingleData, setFormValues, setAllHashtagsData } = counterSlice.actions
export default counterSlice.reducer