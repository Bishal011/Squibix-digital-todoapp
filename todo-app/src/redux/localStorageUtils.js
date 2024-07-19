// localStorageUtils.js
export const loadTodosFromLocalStorage = () => {
    try {
      const serializedTodos = localStorage.getItem('todos');
      if (serializedTodos === null) {
        return [];
      }
      return JSON.parse(serializedTodos);
    } catch (e) {
      console.error("Could not load todos from local storage", e);
      return [];
    }
  };
  
  export const saveTodosToLocalStorage = (todos) => {
    try {
      const serializedTodos = JSON.stringify(todos);
      localStorage.setItem('todos', serializedTodos);
    } catch (e) {
      console.error("Could not save todos to local storage", e);
    }
  };
  