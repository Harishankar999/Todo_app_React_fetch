import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const saveInfo = () => {
    fetch("https://m6g3bt.sse.codesandbox.io/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        value: newTodo,
        isCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      });
  };
  useEffect(() => {
    fetch("https://d3h11l.sse.codesandbox.io/alltodos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  return (
    <div>
      
      <h1>Todos App</h1>
      <div>
        <div>
          <input className="inputtag"
            value={newTodo}
            onChange={({ target }) => setNewTodo(target.value)}
          />
          <br />
          <br />
          <button onClick={saveInfo}>SAVE</button>
        </div>
        <br />
        <br />

        {todos.map((todo) => (
          <div className="alltodo" key={todo.id}><h3>{todo.value}</h3></div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
