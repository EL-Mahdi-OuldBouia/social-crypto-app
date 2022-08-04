import {
    createSlice
} from '@reduxjs/toolkit';


const currentGroupSlice = createSlice({
    name: "currentGroup",
    initialState: {
        currentGroup: {}
    },
    reducers: {
        setCurrentGroup(state, action) {
            state.currentGroup = action.payload
        }
    }
})

export const currentGroupActions = currentGroupSlice.actions;
export default currentGroupSlice;