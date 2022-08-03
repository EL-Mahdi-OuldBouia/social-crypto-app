import {
    configureStore
} from '@reduxjs/toolkit';

import userSlice from './user-slice';
import getMessagesSlice from './getMessages-slice';
import currentChatSlice from './currentChat-slice';
import showHideChatSlice from './showHideChat-slice';
import updatePostsSlice from './updatePosts-slice';
import currentCoverPageSlice from './currentCoverPage-slice';


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        getMessages: getMessagesSlice.reducer,
        currentChat: currentChatSlice.reducer,
        showHideChat: showHideChatSlice.reducer,
        updatePosts: updatePostsSlice.reducer,
        currentCoverPage: currentCoverPageSlice.reducer,
    }
});

export default store;