import { combineReducers } from '@reduxjs/toolkit';
import agentSettingsSlice from './agentSettingsSlice';
import flowRunnerSlice from './flowRunnerSlice';

const agentFlowReducer = combineReducers({
  agentSettingsSlice: agentSettingsSlice,
  flowRunnerSlice: flowRunnerSlice,
});

export default agentFlowReducer;
