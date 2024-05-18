import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoAdd from "./components/TodoAdd";
import { MdOutlineUpdate } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(0);
  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      if (editId) {
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, text: todo } : item
        );

        setTodos(updatedTodos);
        setEditId(0);
      } else {
        const isDuplicate = todos.some((item) => item.text === todo);

        if (!isDuplicate) {
          setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
        } else {
          toast.info("Duplicate Found!", {
            position: "top-right",
          });
        }
      }
      setTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const editTodos = todos.find((to) => to.id === id);
    // console.log("editTodos", editTodos);
    setTodo(editTodos.text);
    // console.log(editTodos.id);
    setEditId(editTodos.id);
  };
  //focus setting using useRef
  const inputRef = useRef("null");
  useEffect(() => {
    // console.log(inputRef.current)
    inputRef.current.focus();
  });

  return (
    <div className="app">
      <ToastContainer />
      <br />
      <div className="wrapper">
        <div className="mainHeading">
          <h1>Get Things Done !</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2> </h2>
        </div>
        <div className="in">
          <div className="input">
            <input
              ref={inputRef}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              value={todo}
              type="text"
              placeholder="🖊️ Add item..."
            />
            {editId ? (
              <MdOutlineUpdate onClick={handleAddTodo} className="update" />
            ) : (
              <i onClick={handleAddTodo} className="fas fa-plus"></i>
            )}
          </div>
        </div>

        <TodoAdd
          todos={todos}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </div>
    </div>
  );
}

export default App;
