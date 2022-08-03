import {
    createSlice
} from '@reduxjs/toolkit';

const updatePostsSlice = createSlice({
    name: 'updatePosts',
    initialState: {
        update: false
    },
    reducers: {
        updatePosts(state, action) {
            state.update = !state.update;
        }
    }
});

export const updatePostsActions = updatePostsSlice.actions;
export default updatePostsSlice;