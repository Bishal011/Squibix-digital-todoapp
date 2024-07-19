// Todo.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/actions';

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-6 bg-black text-white rounded-lg shadow-lg">
      <h2 className='mt-3 mb-6 text-3xl font-bold text-center'>Personal TODO APP</h2>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <input
          id="addTodoInput"
          className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={24} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
        <FilterButtons />
        <div className="flex items-center">
          <input
            className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition">
            <BsSearch size={24} />
          </button>
        </div>
      </div>

      <TodoList />
    </div>
  );
};

export default Todo;
