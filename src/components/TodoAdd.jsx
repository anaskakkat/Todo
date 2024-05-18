import React from "react";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const TodoAdd = ({ todos, onDelete,onEdit }) => {
  // console.log("todos:", todos);
  return (
    <div>
      {todos.map((todo) => (
        <div className="todos" key={todo.id}>
          <div className="todo">
            <div className="left">
              <p>{todo.text}</p>
            </div>
            <div className="right">
              <FaEdit className="edit" onClick={() => onEdit(todo.id)} />
              <AiFillDelete className="fas" onClick={() => onDelete(todo.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoAdd;
