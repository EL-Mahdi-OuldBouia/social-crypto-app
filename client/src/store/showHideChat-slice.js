import {
    createSlice
} from '@reduxjs/toolkit';

const showHideChatSlice = createSlice({
    name: 'showHideChat',
    initialState: {
        showHide: false
    },
    reducers: {
        setShowHideChat(state, action) {
            state.showHide = !state.showHide;
        }
    }
});

export const showHideChatActions = showHideChatSlice.actions;
export default showHideChatSlice;