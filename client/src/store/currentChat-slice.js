import {
    createSlice
} from '@reduxjs/toolkit';

const currentChatSlice = createSlice({
    name: 'currentChat',
    initialState: {
        currentChatId: {}
    },
    reducers: {
        setCurrentChat(state, action) {
            state.currentChatId = action.payload;
        }
    }
});

export const currentChatActions = currentChatSlice.actions;
export default currentChatSlice;