import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search

    return todos.filter((todo) => {
      const matchesFilter = (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  console.log('Filtered Todos:', filteredTodos);

  return (
    <ul className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <li className="my-2 text-sm italic text-gray-400">All Your Notes Here...</li>
      {filteredTodos.length === 0 ? (
        <li className="text-center text-gray-500">No Todos Available</li>
      ) : (
        filteredTodos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
