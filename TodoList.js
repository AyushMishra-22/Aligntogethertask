
import React from 'react';

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ backgroundColor: todo.color }}>
            {todo.text} ({todo.priority})
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


