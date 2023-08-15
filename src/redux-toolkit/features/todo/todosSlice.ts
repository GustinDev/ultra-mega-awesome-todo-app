import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterType = 0 | 1 | 2 | 3;

interface TodoState {
  todos: Todo[];
  filter: number;
  filteredTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  filter: 0,
  filteredTodos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.filteredTodos = state.filteredTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },

    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    //Filter
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    filterTodos: (state) => {
      if (state.filter == 0) {
        state.filteredTodos = state.todos;
      } else {
        state.filteredTodos = state.todos.filter(
          (todo) => todo.importance == state.filter
        );
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, filterTodos, setFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
