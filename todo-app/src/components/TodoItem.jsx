import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes, FaPen } from 'react-icons/fa';
import { toggleTodo, removeTodo, markCompleted, markIncomplete, editTodo } from '../redux/actions';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [alert, setAlert] = useState(null);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      dispatch(editTodo(index, editText.trim()));
      setAlert({ type: 'success', message: 'Todo updated successfully!' });
    } else if (isEditing) {
      setAlert({ type: 'error', message: 'Todo text cannot be empty.' });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="relative flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900 text-white border-b-2 border-gray-700 py-3 px-4 rounded-lg shadow-md mb-2">
      <div className="flex items-center">
        <span className="mr-4 text-gray-400">
          {index + 1}.
        </span>
        {isEditing ? (
          <input
            className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit todo..."
          />
        ) : (
          <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="space-x-2">
        <button
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition"
          onClick={handleEdit}
        >
          <FaPen />
        </button>
        <button
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          onClick={() => dispatch(toggleTodo(index))}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
      {alert && (
        <div className={`absolute bottom-0 left-0 right-0 p-2 rounded-lg text-white ${alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'} transition-opacity`}>
          {alert.message}
        </div>
      )}
    </li>
  );
};

export default TodoItem;
