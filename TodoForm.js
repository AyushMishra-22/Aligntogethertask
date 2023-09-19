
import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [priority, setPriority] = useState('low'); // Default priority is 'low'
  const [todoList, setTodoList] = useState([]);

  // Save data to localStorage whenever todoList changes
  useEffect(() => {
    console.log(todoList,"saving");
  }, [todoList]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedTodoList = sessionStorage.getItem('todoList');
    console.log("ved", storedTodoList);
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  const saveData = (todoList) => {
    sessionStorage.setItem('todoList', JSON.stringify(todoList));
  };


  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === '') return;

    const newTodo = { text: todo, color, priority };
    let newAr = [...todoList];
    switch (priority) {
      case 'high':
        newAr.unshift(newTodo);
        break;
      case 'middle':
        const midIndex = Math.floor(todoList.length / 2);
        newAr.splice(midIndex, 0, newTodo);
        break;
      default:
        newAr.push(newTodo);
        break;
    }
    saveData(newAr)
    setTodoList(newAr);
    setTodo('');
    setColor('#FFFFFF');
    setPriority('low'); // Reset priority to 'low'
  };

  const handleDelete = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    saveData(updatedTodoList)
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Task Count: {todoList.length}</p>
        <ul>
          {todoList.map((todoItem, index) => (
            <li key={index} style={{ backgroundColor: todoItem.color }}>
              {todoItem.text} ({todoItem.priority})
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a todo..."
          value={todo}
          onChange={handleTodoChange}
        />
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="low">Low Priority</option>
          <option value="middle">Middle Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoForm;
