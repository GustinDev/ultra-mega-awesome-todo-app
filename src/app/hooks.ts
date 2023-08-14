import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
//Types
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//Dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
//State Data
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
