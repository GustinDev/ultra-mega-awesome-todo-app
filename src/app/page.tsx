'use client';
//Packages
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
//Redux
import { useAppSelector, useAppDispatch } from './hooks';
import {
  addTodo,
  deleteTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '../redux-toolkit/features/todo/todosSlice';
//Components
import NoTodoItem from '@/components/NoTodoItem/NoTodoItem';
import TodoItem from '@/components/TodoItem/TodoItem';
import Filter from '@/components/Filter/Filter';
//Images & Types
import bgHero from '../../public/bg-hero4.svg';
import Todo from '@/types';

export default function Home() {
  const dispatch = useAppDispatch();

  //Todo Global States (Redux)
  const filter = useAppSelector((state) => state.todoState.filter);
  const allTodos = useAppSelector((state) => state.todoState.todos);
  const searchTerm = useAppSelector((state) => state.todoState.searchTerm);
  const filteredTodos = useAppSelector(
    (state) => state.todoState.filteredTodos
  );

  //Form
  const {
    register,
    handleSubmit: handleSubmitAdd,
    formState: { errors },
    reset,
  } = useForm<Todo>();

  const importanceOptions = [
    { value: 3, label: 'No es urgente.' },
    { value: 2, label: 'Un poco urgente.' },
    { value: 1, label: '¡Muy urgente!' },
  ];

  const handleAddTodo = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      importance: Number(data.importance),
      id: uuidv4(),
    };
    dispatch(addTodo(newTodo));
    //Filter
    dispatch(setFilter(0));
    dispatch(setSearchTerm(''));
    dispatch(filterAndSearchTodos());
    reset();
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <main
      className='flex min-h-screen flex-col w-full justify-start items-center bg-cover'
      style={{
        backgroundImage: `url(${bgHero.src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* FORM AND FILTER */}
      <div className='heroContainer w-full flex justify-center items-center bg-cover'>
        <div className='formAndFilterContainer w-10/12 md:w-10/12  xl:w-6/12 2xl:w-4/12 h-full my-10 bg.'>
          {/* FORM*/}
          <div className='formContainer border-2 border-customBlue4 bg-white rounded-lg'>
            <form
              onSubmit={handleSubmitAdd(handleAddTodo)}
              className='flex flex-col w-full p-5'
            >
              <h1 className='text-center mb-5 font-bold uppercase text-xl text-customBlue5'>
                awesome todo app
              </h1>
              {/* Title */}
              <div className='w-full '>
                <input
                  className='w-full border-2 border-customBlue4  p-2 rounded-md'
                  type='text'
                  placeholder='Título'
                  {...register('title', {
                    required: 'El título es requerido.',
                  })}
                />
                {errors.title ? (
                  <div>
                    <p className='text-red-500'>{errors.title.message}</p>{' '}
                  </div>
                ) : (
                  <div className='h-[24px]'></div>
                )}
              </div>
              {/* Description */}
              <div className='w-full h-fit'>
                <textarea
                  className='rounded-md w-full border-2 border-customBlue4 p-2'
                  placeholder='Descripción.'
                  {...register('description', {
                    required: 'La descripción es requerida.',
                  })}
                />
                {errors.description ? (
                  <div>
                    <p className='text-red-500'>{errors.description.message}</p>
                  </div>
                ) : (
                  <div className='h-[24px]'></div>
                )}
              </div>
              {/* Importance */}
              <div className='w-full'>
                <label>¿Que tan urgente es la tarea?</label>
                <select
                  className='w-full border-2 border-customBlue4 mb-2 p-2'
                  {...register('importance', {
                    required: 'La urgencia es requerida.',
                  })}
                >
                  {importanceOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.importance && (
                  <p className='text-red-500'>{errors.importance.message}</p>
                )}
              </div>
              <button
                className='w-full border-2 rounded-lg p-2 text-md uppercase mt-2  border-customBlue4 bg-customBlue3 hover:bg-customBlue4 font-bold text-white'
                type='submit'
              >
                Añadir tarea
              </button>
            </form>
          </div>
          {/* FILTER */}
          <Filter />
        </div>
      </div>
      {/* TODOS */}
      <div className='todosContainer flex w-9/12 flex-row gap-2 my-4 flex-wrap justify-center '>
        {filter === 0 && searchTerm === '' && allTodos.length > 0 ? (
          allTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (filter !== 0 || searchTerm !== '') && filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <NoTodoItem />
        )}
      </div>
    </main>
  );
}
