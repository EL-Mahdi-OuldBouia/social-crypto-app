import {
    createSlice
} from '@reduxjs/toolkit';


const showGroupSlice = createSlice({
    name: 'showGroup',
    initialState: {
        showGroup: false
    },
    reducers: {
        setShowGroup(state) {
            state.showGroup = !state.showGroup
        }
    }
})

export const showGroupActions = showGroupSlice.actions;
export default showGroupSlice;