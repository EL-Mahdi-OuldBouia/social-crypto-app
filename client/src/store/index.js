import {
    configureStore
} from '@reduxjs/toolkit';

import userSlice from './user-slice';
import getMessagesSlice from './getMessages-slice';
import currentChatSlice from './currentChat-slice';
import showHideChatSlice from './showHideChat-slice';
import updatePostsSlice from './updatePosts-slice';
import currentCoverPageSlice from './currentCoverPage-slice';
import currentGroupSlice from './currentGroup-slice';
import showGroupSlice from './showGroup-slice';


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        getMessages: getMessagesSlice.reducer,
        currentChat: currentChatSlice.reducer,
        showHideChat: showHideChatSlice.reducer,
        updatePosts: updatePostsSlice.reducer,
        currentCoverPage: currentCoverPageSlice.reducer,
        currentGroup: currentGroupSlice.reducer,
        showGroup: showGroupSlice.reducer,
    }
});

export default store;