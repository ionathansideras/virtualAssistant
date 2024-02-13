// Import the createSlice and nanoid functions from Redux Toolkit
// createSlice automatically generates action creators and action types
// nanoid generates unique IDs
import {createSlice} from '@reduxjs/toolkit';

// Create a slice of the Redux store for cars
// A "slice" is a portion of the Redux store where a particular feature keeps its state
const audioControl = createSlice({
    // The name of the slice. This will be used as a prefix for the generated action types
    name: 'audio',
    // The initial state for this slice of the Redux store
    initialState: {
        playAudio: false, 
        script: 'welcome',  
        audioTime: 0
    },
    // The reducers for this slice of the Redux store
    // Reducers are functions that determine how the state should be updated in response to an action
    reducers: {
        // A reducer to set the playAudio state
        setPlayAudio: (state, action) => {
            state.playAudio = action.payload;
        },
        // A reducer to set the script state
        setScript: (state, action) => {
            state.script = action.payload;
        },
        // A reducer to set the audioTime state
        setAudioTime: (state, action) => {
            state.audioTime = action.payload;
        },
    }
});

// Export the generated action creators for the cars slice
// These can be used to dispatch actions that the reducers will respond to
export const {setPlayAudio, setScript, setAudioTime} = audioControl.actions;
export const audioReducer = audioControl.reducer;