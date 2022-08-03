import {
    createSlice
} from '@reduxjs/toolkit';


const currentCoverPageSlice = createSlice({
    name: 'currentCoverPage',
    initialState: {
        currentCoverPage: ""
    },
    reducers: {
        setCurrentCoverPage(state, action) {
            state.currentCoverPage = action.payload;
        }
    }
})

export const currentCoverPageActions = currentCoverPageSlice.actions;
export default currentCoverPageSlice;