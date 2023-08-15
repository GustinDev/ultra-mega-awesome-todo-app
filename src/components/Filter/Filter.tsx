import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  FilterType,
  filterTodos,
  setFilter,
} from '@/redux-toolkit/features/todo/todosSlice';

type Props = {};

const Filter = (props: Props) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todoState.filter);

  const handleChangeFilter = (newFilter: FilterType) => {
    //Change Filter
    dispatch(setFilter(newFilter));
    //Aply Filter
    dispatch(filterTodos());
  };

  return (
    <div className='filterContainer w-6/12 mx-auto bg-red-400 flex flex-row justify-around mt-4 border-2 border-black rounded-xl'>
      <button
        className={`bg-white py-3 h-full w-1/4 rounded-l-xl ${
          filter === 0 ? 'active font-bold bg-gray-300' : ''
        }`}
        onClick={() => handleChangeFilter(0)}
      >
        Todos
      </button>
      <button
        className={`bg-white py-3 h-full w-1/4 ${
          filter === 1 ? 'active font-bold bg-gray-300' : ''
        }`}
        onClick={() => handleChangeFilter(1)}
      >
        ¡Muy urgentes!
      </button>
      <button
        className={`bg-white py-3 h-full w-1/4 ${
          filter === 2 ? 'active font-bold bg-gray-300' : ''
        }`}
        onClick={() => handleChangeFilter(2)}
      >
        Un poco urgentes
      </button>
      <button
        className={`bg-white py-3 h-full w-1/4  rounded-r-xl ${
          filter === 3 ? 'active font-bold bg-gray-300' : ''
        }`}
        onClick={() => handleChangeFilter(3)}
      >
        No urgentes
      </button>
    </div>
  );
};

export default Filter;
