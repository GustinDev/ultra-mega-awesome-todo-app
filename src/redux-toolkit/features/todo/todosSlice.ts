import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo, { FilterType, TodoState } from '@/types';

//States
const initialState: TodoState = {
  todos: [],
  filter: 0,
  searchTerm: '',
  filteredTodos: [],
};

//Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    //CRUD
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
    //Variables to Filter
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    //Filter Reducer
    filterAndSearchTodos: (state) => {
      //Filter
      if (state.filter === 0) {
        state.filteredTodos = state.todos;
      } else {
        state.filteredTodos = state.todos.filter(
          (todo) => todo.importance === state.filter
        );
      }
      //Search
      const searchTerm = state.searchTerm.toLowerCase();
      if (searchTerm.trim() === '') {
        return;
      }
      state.filteredTodos = state.filteredTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const {
  addTodo,
  editTodo,
  setFilter,
  deleteTodo,
  setSearchTerm,
  filterAndSearchTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
