//ToDo's
export default interface Todo {
  id: string;
  title: string;
  description: string;
  importance: number;
}

//Importance
export type FilterType = 0 | 1 | 2 | 3;

//States - Redux
export interface TodoState {
  todos: Todo[];
  filter: number;
  searchTerm: string;
  filteredTodos: Todo[];
}

//Props Items
export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}
