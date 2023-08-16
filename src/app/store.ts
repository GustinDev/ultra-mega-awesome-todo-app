//Redux & Slice
import { configureStore, Middleware } from '@reduxjs/toolkit';
import todoReducer from '../redux-toolkit/features/todo/todosSlice';
//Persist
storage;
import { persistStore, persistReducer } from 'redux-persist';
import storage from '../redux-toolkit/persistStorage';

//Persist Config
const persistConfig = {
  key: 'root',
  storage,
};
const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

//Serializable
const nonSerializableMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

//Store & Reducers Slice
export const store = configureStore({
  reducer: {
    todoState: persistedTodoReducer,
  },

  middleware: [nonSerializableMiddleware],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
