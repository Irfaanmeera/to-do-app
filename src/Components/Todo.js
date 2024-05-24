import React, { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      console.log(todos);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((list) => list.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(updateTodo);
      setEditId();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const completeTodo = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const editTodo = (id) => {
    const edit = todos.find((list) => list.id === id);
    console.log(edit.list);
    setTodo(edit.list);
    setEditId(edit.id);
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your to-do"
          className="form-control"
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li className="list-items">
              <div
                className="list-item-list"
                id={todo.status ? "list-item" : ""}
              >
                {todo.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => completeTodo(todo.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => editTodo(todo.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => deleteTodo(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
