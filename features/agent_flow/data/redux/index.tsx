import { combineReducers } from '@reduxjs/toolkit';
import agentSettingsSlice from './agentSettingsSlice';

const agentFlowReducer = combineReducers({
  agentSettingsSlice: agentSettingsSlice,
});

export default agentFlowReducer;
