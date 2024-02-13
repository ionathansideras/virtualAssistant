// Import the configureStore function from Redux Toolkit
// This function is used to create a Redux store
import { configureStore } from "@reduxjs/toolkit";
import { audioReducer, setPlayAudio, setScript, setAudioTime } from "./slices/audioSlice";
import {usePostUsersInputMutation, usersInputApi} from "./apis/sendUsersInput";
import { setupListeners } from "@reduxjs/toolkit/query";
import {responseReducer, addResponse} from "./slices/responsesSlice";
// Create a Redux store
// The store is configured with reducers 
const store = configureStore({
    reducer: {
        audio: audioReducer,
        [usersInputApi.reducerPath]: usersInputApi.reducer,
        responses: responseReducer
    },
    // 'middleware' is an array of Redux middleware
    // Here, it gets the default middleware and adds the 'albumsApi' middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersInputApi.middleware)
});

// Setting up listeners for the Redux store
// These listeners can react to actions dispatched to the Redux store
setupListeners(store.dispatch);

// Export the store
export {
    store,
    setPlayAudio,
    setScript,
    setAudioTime,
    usePostUsersInputMutation,
    usersInputApi,
    responseReducer,
    addResponse
};