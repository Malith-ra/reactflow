import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import agentFlowReducer from '@/features/agent_flow/data/redux';

// Combine reducers (you can add more here later)
const rootReducer = combineReducers({
  agentFlow: agentFlowReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['agentFlow'], // only persist agentFlow
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
