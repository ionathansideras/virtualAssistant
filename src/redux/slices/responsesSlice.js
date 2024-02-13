import { createSlice } from '@reduxjs/toolkit';

const responsesSlice = createSlice({
  name: 'responses',
  initialState: [
    {
      userText: 'Hello',
      aiTextResponse: 'Hi there!',
      aiVoiceResponse: 'Hi there!',
    },
  ],
  reducers: {
    addResponse: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addResponse } = responsesSlice.actions;

export const responseReducer = responsesSlice.reducer;