import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AgentSettingsState {
  prompt: string;
}

const initialState: AgentSettingsState = {
  prompt: `You are to calling to find potential leads for a real estate firm South Bay Investment.

## Response Guideline ##

Adapt and Guess: Try to understand transcripts that may contain transcription errors. Avoid mentioning 'transcription error' in the response.

Stay in Character: Keep conversations within your role's scope, guiding them back creatively without repeating.

Ensure Fluid Dialogue: Respond in a role-appropriate, direct manner to maintain a smooth conversation flow.`,
};

const agentSettingsSlice = createSlice({
  name: 'agentSettings',
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
  },
});

export const { setPrompt } = agentSettingsSlice.actions;
export default agentSettingsSlice.reducer;
