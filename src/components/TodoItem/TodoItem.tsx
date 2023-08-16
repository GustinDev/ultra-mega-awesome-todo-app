//Redux
import { useAppDispatch } from '@/app/hooks';
import {
  editTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '@/redux-toolkit/features/todo/todosSlice';
//Packages & Types
import Todo, { TodoItemProps } from '@/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Todo Item Card - Component
const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  // Initialize Redux dispatch
  const dispatch = useAppDispatch();

  // State for Editing. False: Shows Data | True: Shows Form to Edit
  const [editing, setEditing] = useState(false);

  // Initialize edit form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    defaultValues: todo,
  });

  // Define importance options for dropdown (urgency)
  const importanceOptions = [
    { value: 3, label: 'No es urgente.' },
    { value: 2, label: 'Un poco urgente.' },
    { value: 1, label: '¡Muy urgente!' },
  ];

  // Function to handle edit State
  const handleEditTodo = () => {
    setEditing(true);
  };

  // Function to save edit changes
  const handleSaveEdit = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      importance: Number(data.importance),
    };
    dispatch(editTodo(newTodo)); //Dispatch edited todo.
    //Reset filtes, and states.
    dispatch(setFilter(0));
    dispatch(setSearchTerm(''));
    dispatch(filterAndSearchTodos());
    setEditing(false);
  };

  // Function to cancel edit changes
  const handleCancelEdit = () => {
    setEditing(false);
    reset(todo);
  };

  return (
    <div className='card w-80 h-80 border-2 border-customBlue4 p-5 bg-white rounded-lg'>
      {editing ? (
        // Edit Form
        <form
          onSubmit={handleSubmit(handleSaveEdit)}
          className='w-full h-full flex flex-col justify-between'
        >
          <div className='w-full h-full'>
            <div className='w-full flex justify-end '>
              <select
                className='px-2 py-[10px] border-2 border-black rounded-xl mb-3'
                defaultValue={todo.importance}
                {...register('importance', {
                  required: 'La importancia es requerida.',
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
            </div>
            {errors.importance && (
              <p className='text-red-500'>{errors.importance.message}</p>
            )}
            <input
              className='w-full font-bold text-xl p-2 border-2 border-customBlue4 rounded-lg'
              type='text'
              defaultValue={todo.title}
              {...register('title', { required: 'El título es requerido.' })}
            />
            {errors.title ? (
              <div>
                <p className='text-red-500'>{errors.title.message}</p>{' '}
              </div>
            ) : (
              <div className='h-[24px]'></div>
            )}
            <textarea
              className='w-full  text-lg p-2 border-2 border-customBlue4 rounded-lg'
              defaultValue={todo.description}
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
          <div className='w-full gap-1 flex justify-between '>
            <button
              className='bg-red-100 border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
            <button
              className='bg-blue-100 border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              type='submit'
            >
              Guardar
            </button>
          </div>
        </form>
      ) : (
        // Todo Item Card
        <div className='flex flex-col justify-between h-full w-full'>
          <div className='h-full w-full'>
            <div className='w-full flex justify-end h-fit'>
              <h1
                className={`p-2 border-2  rounded-xl ${
                  todo.importance == 1
                    ? 'bg-red-500 border-red-900 text-white'
                    : todo.importance == 2
                    ? 'bg-orange-500 border-orange-900 text-white'
                    : todo.importance == 3
                    ? 'bg-green-600 border-green-900 text-white'
                    : ''
                }`}
              >
                {todo.importance == 1
                  ? ' ¡Muy urgente!'
                  : todo.importance == 2
                  ? ' Un poco urgente.'
                  : todo.importance == 3
                  ? ' No es urgente.'
                  : ''}
              </h1>
            </div>
            <h1 className='font-bold text-xl overflow-auto  h-16'>
              {todo.title}
            </h1>
            <h1 className='text-lg overflow-auto  h-28'>{todo.description}</h1>
          </div>
          <div className='w-full gap-1 flex justify-between '>
            <button
              className='bg-red-100 border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              onClick={() => onDelete(todo.id)}
            >
              Borrar
            </button>
            <button
              className='bg-blue-100 border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              onClick={handleEditTodo}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
