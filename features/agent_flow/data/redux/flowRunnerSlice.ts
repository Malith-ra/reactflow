import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';

interface FlowRunnerState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: FlowRunnerState = {
  nodes: [],
  edges: [],
};

const flowRunnerSlice = createSlice({
  name: 'flowRunner',
  initialState,
  reducers: {
    setFlow(state, action: PayloadAction<{ nodes: Node[]; edges: Edge[] }>) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
  },
});

export const { setFlow } = flowRunnerSlice.actions;
export default flowRunnerSlice.reducer;
