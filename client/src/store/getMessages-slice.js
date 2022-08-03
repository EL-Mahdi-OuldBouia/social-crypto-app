import {
    createSlice
} from '@reduxjs/toolkit';

const getMessagesSlice = createSlice({
    name: 'getMessages',
    initialState: {
        getMessages: false
    },
    reducers: {
        getMessagesFun(state, action) {
            state.getMessages = !state.getMessages;
        }
    }
});

export const getMessagesActions = getMessagesSlice.actions;
export default getMessagesSlice;