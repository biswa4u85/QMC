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

export const feachAllBrandData = createAsyncThunk(
    'brand/feachAllBrandData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/brands`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const feachSingleData = createAsyncThunk(
    'brand/feachSingleData',
    async (params, { rejectWithValue }) => {
        const response = await apiGetCall(`/brands`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }

        let data = response?.data?.data[0] ? response.data.data[0] : null
        data['influencerLists'] = data.influencers
        data['catagoryLists'] = data.categories
        data['hashtagsLists'] = data.hashtags
        data['promoLists'] = [data.currentPromo]

        let newinfluencers = []
        for (let item of data.influencers) {
            newinfluencers.push(item._id)
        }
        data['influencers'] = newinfluencers

        let newcategories = []
        for (let item of data.categories) {
            newcategories.push(item._id)
        }
        data['categories'] = newcategories

        let newhashtags = []
        for (let item of data.hashtags) {
            newhashtags.push(item._id)
        }
        data['hashtags'] = newhashtags

        let currentPromo = data?.currentPromo?._id ? data.currentPromo._id : ''
        data['currentPromo'] = currentPromo

        return data


    }
)

export const addNewData = createAsyncThunk(
    'brand/addNewData',
    async (params, { rejectWithValue }) => {
        const response = await apiPostCall(`/brands`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data?.data
    }
)

export const editData = createAsyncThunk(
    'brand/editData',
    async (params, { rejectWithValue }) => {
        const response = await apiPutCall(`/brands/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response?.data
    }
)

export const deleteData = createAsyncThunk(
    'brand/deleteData',
    async (params, { rejectWithValue }) => {
        const response = await apiDeleteCall(`/brands/${params?._id}`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return params
    }
)

export const counterSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setAllBrandData: (state, action) => {
            state.dataLists = { data: action?.payload }
        },

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
        [feachAllBrandData.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.dataLists = []
        },
        [feachAllBrandData.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload
        },
        [feachAllBrandData.fulfilled]: (state, action) => {
            state.isFetching = false
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
            state.error = action?.payload
        },
        [addNewData.fulfilled]: (state, action) => {
            message.success(`Data Added Successfully`);
            state.isFetching = false
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
            state.error = action?.payload
        },
        [editData.fulfilled]: (state, action) => {
            message.success(`Data Edit Successfully`);
            state.isFetching = false
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
            let data = state.dataLists.data.filter(item => (item._id !== action?.payload?._id));
            let totalCount = state.dataLists.totalCount - 1
            state.dataLists = { ...state.dataLists, data, totalCount }
        },
    }

})

export const { resetAllData, resetSingleData, setFormValues, setAllBrandData } = counterSlice.actions
export default counterSlice.reducer