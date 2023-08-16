import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  editTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from '@/redux-toolkit/features/todo/todosSlice';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    defaultValues: todo,
  });

  const importanceOptions = [
    { value: 3, label: 'No es urgente.' },
    { value: 2, label: 'Un poco urgente.' },
    { value: 1, label: '¡Muy urgente!' },
  ];

  const handleEditTodo = () => {
    setEditing(true);
  };

  const handleSaveEdit = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      importance: Number(data.importance),
    };
    dispatch(editTodo(newTodo));
    dispatch(setFilter(0));
    dispatch(setSearchTerm(''));
    dispatch(filterAndSearchTodos());
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    reset(todo);
  };

  return (
    <div className='card w-80 h-80 border-2 border-customBlue4 p-5 bg-white rounded-lg'>
      {editing ? (
        // Form
        <form
          onSubmit={handleSubmit(handleSaveEdit)}
          className='w-full h-full flex flex-col justify-between'
        >
          <div className='w-full'>
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
              className='border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
            <button
              className='border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              type='submit'
            >
              Guardar
            </button>
          </div>
        </form>
      ) : (
        // Card
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='w-full flex justify-end '>
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
            <h1 className='font-bold text-xl overflow-auto'>{todo.title}</h1>
            <h1 className='text-lg overflow-auto'>{todo.description}</h1>
          </div>
          <div className='w-full gap-1 flex justify-between '>
            <button
              className='border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
              onClick={() => onDelete(todo.id)}
            >
              Borrar
            </button>
            <button
              className='border-2 border-black w-2/3 rounded-lg hover:bg-gray-200'
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
