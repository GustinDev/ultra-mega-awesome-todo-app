import { useAppDispatch, useAppSelector } from '@/app/hooks'; // Import Redux Hooks (TS)
import { FilterType } from '@/types';
import { useState } from 'react';
import {
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '@/redux-toolkit/features/todo/todosSlice'; // Import Redux actions

type Props = {};

//Filter Component
const Filter = (props: Props) => {
  // Initialize Redux Dispatch
  const dispatch = useAppDispatch();

  // Retrieve global states from Redux
  const filter = useAppSelector((state) => state.todoState.filter);

  // State for Search Input
  const [searchInput, setSearchInput] = useState('');

  // Function to handle changing the filter
  const handleChangeFilter = (newFilter: FilterType) => {
    //Set Filter
    dispatch(setFilter(newFilter));
    //Apply Filter
    dispatch(filterAndSearchTodos());
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    // Set Search Term
    dispatch(setSearchTerm(searchInput));
    // Apply Filter and Search
    dispatch(filterAndSearchTodos());
  };

  // Function to handle reset button
  const handleResetButton = () => {
    dispatch(setFilter(0));
    dispatch(setSearchTerm(''));
    setSearchInput('');
  };

  return (
    <div className='filterContainer w-full mx-auto  flex flex-col justify-center items-center mt-4 gap-2 bg-white rounded-lg p-5 border-2 border-customBlue4 h-full'>
      <h1 className='text-center mb-2 font-bold uppercase text-xl text-customBlue5'>
        filtros
      </h1>
      {/* Search Container */}
      <div className='searchContainer py-2 md:py-0 w-full flex flex-col md:flex-row gap-2 h-full'>
        <input
          className='w-full md:w-7/12 p-2 border-2 border-customBlue4 rounded-md'
          type='text'
          placeholder='Buscar tarea por título...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* Buttons for search and reset */}
        <div className='flex gap-1 w-full md:w-5/12 justify-center h-full'>
          <button
            className='py-2 px-4  rounded-md border-2  border-customBlue4 bg-customBlue3 hover:bg-customBlue4 font-bold text-white w-2/5'
            onClick={handleSearchButtonClick}
          >
            Buscar
          </button>
          <button
            className=' px-4   rounded-md border-2 border-customBlue4 bg-customBlue3 hover:bg-customBlue4 font-bold text-white w-3/5'
            onClick={handleResetButton}
          >
            Borrar Filtros
          </button>
        </div>
      </div>
      {/* Filter buttons */}
      <div className='w-full h-full border-2 border-gray-800 rounded-lg flex justify-center items-center'>
        <button
          className={`hover:bg-gray-300 text-black py-7 md:py-4 h-full w-1/4 rounded-l-md border-gray-800 border-r-2 ${
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
