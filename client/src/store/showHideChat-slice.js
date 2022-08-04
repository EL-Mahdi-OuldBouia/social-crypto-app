import {
    createSlice
} from '@reduxjs/toolkit';

const showHideChatSlice = createSlice({
    name: 'showHideChat',
    initialState: {
        showHide: false
    },
    reducers: {
        setShowHideChat(state) {
            state.showHide = !state.showHide;
        },
        setShowChat(state) {
            state.showHide = true;
        }
    }
});

export const showHideChatActions = showHideChatSlice.actions;
export default showHideChatSlice;