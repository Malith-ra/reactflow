import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NodeData {
  id: string;
  label?: string;
  message?: string;
  details?: string;
  subnodes?: { id: string; text: string }[];
}

interface AgentSettingsState {
  prompt: string;
  nodes: Record<string, NodeData>;
}

const initialState: AgentSettingsState = {
  prompt: `You are to calling to find potential leads for a real estate firm South Bay Investment.

## Response Guideline ##

Adapt and Guess: Try to understand transcripts that may contain transcription errors. Avoid mentioning 'transcription error' in the response.

Stay in Character: Keep conversations within your role's scope, guiding them back creatively without repeating.

Ensure Fluid Dialogue: Respond in a role-appropriate, direct manner to maintain a smooth conversation flow.`,
  nodes: {},
};

const agentSettingsSlice = createSlice({
  name: 'agentSettings',
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    setNodeMessage(
      state,
      action: PayloadAction<{ id: string; message: string }>,
    ) {
      const node = state.nodes[action.payload.id] || { id: action.payload.id };
      node.message = action.payload.message;
      state.nodes[action.payload.id] = node;
    },
    setNodeDetails(
      state,
      action: PayloadAction<{ id: string; details: string }>,
    ) {
      const node = state.nodes[action.payload.id] || { id: action.payload.id };
      node.details = action.payload.details;
      state.nodes[action.payload.id] = node;
    },
    // addSubnode(state, action: PayloadAction<{ id: string; text: string }>) {
    //   const node = state.nodes[action.payload.id] || {
    //     id: action.payload.id,
    //     subnodes: [],
    //   };
    //   if (!node.subnodes) node.subnodes = [];
    //   node.subnodes.push({ id: `${Date.now()}`, text: action.payload.text });
    //   state.nodes[action.payload.id] = node;
    // },
    addSubnode: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const { id, text } = action.payload;

      // Ensure the node exists
      if (!state.nodes) state.nodes = {};
      if (!state.nodes[id]) {
        state.nodes[id] = { id };
      }

      // Ensure subnodes array is present
      if (!state.nodes[id].subnodes) {
        state.nodes[id].subnodes = [];
      }

      state.nodes[id].subnodes!.push({ id: `${Date.now()}`, text });
    },

    removeSubnode: (
      state,
      action: PayloadAction<{ id: string; subId: string }>,
    ) => {
      const node = state.nodes[action.payload.id];
      if (node?.subnodes) {
        node.subnodes = node.subnodes.filter(
          (s) => s.id !== action.payload.subId,
        );
      }
    },
  },
});

export const {
  setPrompt,
  setNodeMessage,
  setNodeDetails,
  addSubnode,
  removeSubnode,
} = agentSettingsSlice.actions;

export default agentSettingsSlice.reducer;
