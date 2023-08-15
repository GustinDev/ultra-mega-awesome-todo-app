//Redux & Slice
import { configureStore, Middleware } from '@reduxjs/toolkit';
import todoReducer from '../redux-toolkit/features/todo/todosSlice';
//Persist
storage;
import { persistStore, persistReducer } from 'redux-persist';
import storage from '../redux-toolkit/persistStorage';

//PERSIST
const persistConfig = {
  key: 'root',
  storage,
};
const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

//SERIALIZABLE

const nonSerializableMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

//STORE
export const store = configureStore({
  reducer: {
    todoState: persistedTodoReducer,
  },

  middleware: [nonSerializableMiddleware],
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
