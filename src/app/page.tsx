'use client';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  addTodo,
  deleteTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '../redux-toolkit/features/todo/todosSlice';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useEffect } from 'react';
import Filter from '@/components/Filter/Filter';
import NoTodoItem from '@/components/NoTodoItem/NoTodoItem';

export default function Home() {
  const dispatch = useAppDispatch();

  //Todo States
  const filter = useAppSelector((state) => state.todoState.filter);
  const allTodos = useAppSelector((state) => state.todoState.todos);
  const searchTerm = useAppSelector((state) => state.todoState.searchTerm);
  const filteredTodos = useAppSelector(
    (state) => state.todoState.filteredTodos
  );

  console.log(filter);
  console.log(filteredTodos);

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
    <main className='flex min-h-screen flex-col w-full justify-start items-center'>
      {/* FORM*/}
      <div className='formContainer w-4/12 h-full border-2 border-black mt-10'>
        <form
          onSubmit={handleSubmitAdd(handleAddTodo)}
          className='flex flex-col w-full p-5'
        >
          {/* Title */}
          <div className='w-full '>
            <input
              className='w-full border-2 border-black  p-2 rounded-md'
              type='text'
              placeholder='Título'
              {...register('title', { required: 'El título es requerido.' })}
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
              className='rounded-md w-full border-2 border-black p-2'
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
              className='w-full border-2 border-black mb-2 p-2'
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
            className='w-full border-2 border-black rounded-lg p-2 text-md uppercase mt-2'
            type='submit'
          >
            Añadir tarea
          </button>
        </form>
      </div>
      {/* FILTER */}
      <Filter />
      {/* TODOS */}
      <div className='todosContainer flex w-8/12 flex-row gap-2 my-4 flex-wrap justify-center'>
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
