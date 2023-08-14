//Redux & Slice
import { configureStore, Middleware } from '@reduxjs/toolkit';
import counterReducer from './redux-toolkit/features/counter/counterSlice';
//Persist
storage;
import { persistStore, persistReducer } from 'redux-persist';
import storage from './redux-toolkit/persistStorage';

//PERSIST
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, counterReducer);

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
    counterState: persistedReducer,
  },

  middleware: [nonSerializableMiddleware],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
