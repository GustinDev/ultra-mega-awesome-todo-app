import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import {
  FilterType,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '@/redux-toolkit/features/todo/todosSlice';

type Props = {};

const Filter = (props: Props) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todoState.filter);
  const searchTerm = useAppSelector((state) => state.todoState.searchTerm);
  const [searchInput, setSearchInput] = useState('');

  console.log(searchTerm);

  const handleChangeFilter = (newFilter: FilterType) => {
    //Change Filter
    dispatch(setFilter(newFilter));
    //Aply Filter
    dispatch(filterAndSearchTodos());
  };

  const handleSearchButtonClick = () => {
    // Update Search Term
    dispatch(setSearchTerm(searchInput));
    // Apply Filter and Search
    dispatch(filterAndSearchTodos());
  };

  const handleResetButton = () => {
    dispatch(setFilter(0));
    dispatch(setSearchTerm(''));
    setSearchInput('');
  };

  return (
    <div className='filterContainer w-full mx-auto  flex flex-col justify-center items-center mt-4 gap-2 '>
      <div className='searchContainer py-3 md:py-0 px-3 md:pl-6 w-full md:w-1/2 flex gap-2'>
        <input
          className='w-full p-2 border-2 border-black rounded-md'
          type='text'
          placeholder='Buscar tarea por título...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className='bg-white py-2 px-4 mt-3 md:mt-0  rounded-md border-2 border-black '
          onClick={handleSearchButtonClick}
        >
          Buscar
        </button>
        <button
          className='bg-white py-2 px-4 mt-3 md:mt-0 rounded-md border-2 border-black w-60'
          onClick={handleResetButton}
        >
          Borrar Filtros
        </button>
      </div>

      <div className='w-6/12 border-2 border-black rounded-lg'>
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
    </div>
  );
};

export default Filter;
