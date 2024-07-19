

import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
  EDIT_TODO, 
} from './actionTypes';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from './localStorageUtils';

const dummyTodos = [
  { text: "Learn React", completed: false },
  { text: "Build a Todo App", completed: false },
  { text: "Master Redux", completed: false },
  { text: "Deploy the App", completed: false },
  { text: "Learn Html", completed: false },
  { text: "Learn Css", completed: false },
  { text: "Learn Js", completed: true },
];

const initialState = {
  todos: loadTodosFromLocalStorage().length ? loadTodosFromLocalStorage() : dummyTodos,
  filter: 'ALL',
  searchTerm: '',
};

const todoReducer = (state = initialState, action) => {
  let newTodos;

  switch (action.type) {
    case ADD_TODO:
      newTodos = [...state.todos, { text: action.payload.text, completed: false }];
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case TOGGLE_TODO:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case REMOVE_TODO:
      newTodos = state.todos.filter((todo, index) => index !== action.payload.id);
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case MARK_COMPLETED:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, completed: true } : todo
      );
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case MARK_INCOMPLETE:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, completed: false } : todo
      );
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case FILTER_TODOS:
      return {
        ...state,
        filter: action.payload.filter,
      };

    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case MARK_ALL_COMPLETED:
      newTodos = state.todos.map((todo) => ({ ...todo, completed: true }));
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    case EDIT_TODO:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
      saveTodosToLocalStorage(newTodos);
      return {
        ...state,
        todos: newTodos,
      };

    default:
      return state;
  }
};

export default todoReducer;
