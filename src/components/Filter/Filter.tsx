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
    <div className='filterContainer w-full mx-auto  flex flex-col justify-center items-center mt-4 gap-2 bg-white rounded-lg p-5 border-2 border-customBlue4'>
      <h1 className='text-center mb-2 font-bold uppercase text-xl text-customBlue5'>
        filtros
      </h1>
      <div className='searchContainer py-4 md:py-0 w-full flex gap-2'>
        <input
          className='w-full p-2 border-2 border-customBlue4 rounded-md'
          type='text'
          placeholder='Buscar tarea por título...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className='py-2 px-4 mt-3 md:mt-0  rounded-md border-2  border-customBlue4 bg-customBlue3 hover:bg-customBlue4 font-bold text-white'
          onClick={handleSearchButtonClick}
        >
          Buscar
        </button>
        <button
          className=' py-2 px-4 mt-3 md:mt-0 rounded-md border-2 border-customBlue4 bg-customBlue3 hover:bg-customBlue4 font-bold text-white w-60'
          onClick={handleResetButton}
        >
          Borrar Filtros
        </button>
      </div>

      <div className='w-full border-2 border-gray-800 rounded-lg'>
        <button
          className={`hover:bg-gray-300 text-black py-4 h-full w-1/4 rounded-l-md border-gray-800 border-r-2 ${
            filter == 0 ? 'active font-bold bg-customBlue4 text-white' : ''
          }`}
          onClick={() => handleChangeFilter(0)}
        >
          Todos
        </button>
        <button
          className={`hover:bg-gray-300 py-4 h-full w-1/4 border-gray-800 border-r-2 ${
            filter == 1 ? 'active font-bold bg-red-500  text-white' : ''
          }`}
          onClick={() => handleChangeFilter(1)}
        >
          ¡Muy urgente!
        </button>
        <button
          className={`hover:bg-gray-300 py-4 h-full w-1/4 border-gray-800 border-r-2 ${
            filter == 2 ? 'active font-bold bg-orange-500 text-white' : ''
          }`}
          onClick={() => handleChangeFilter(2)}
        >
          Poco urgente
        </button>
        <button
          className={`hover:bg-gray-300 py-4 h-full w-1/4  rounded-r-md ${
            filter === 3 ? 'active font-bold bg-green-600  text-white' : ''
          }`}
          onClick={() => handleChangeFilter(3)}
        >
          No urgente
        </button>
      </div>
    </div>
  );
};

export default Filter;
