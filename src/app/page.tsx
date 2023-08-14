'use client';
import {
  decrement,
  increment,
} from './redux-toolkit/features/counter/counterSlice';
import { useAppSelector, useAppDispatch } from './hooks';

export default function Home() {
  const counter = useAppSelector((state) => state.counterState.value);
  const dispatch = useAppDispatch();

  return (
    <main className='flex min-h-screen flex-col items-start  '>
      <h2 className='my-2 te'>Counter: {counter}</h2>
      <button
        className='p-2 border-2 border-black rounded-lg'
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button
        className='p-2 border-2 border-black rounded-lg'
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>
    </main>
  );
}
