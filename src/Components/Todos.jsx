import React, { useEffect, useState } from "react";
import axios from "axios";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    const getTodo = async () => {
      let res = await axios.get(
        `https://d3h11l.sse.codesandbox.io/alltodos?_page=${page}&_limit=${limit}`
      );
      setTodos(res.data);
      setTotalCount(Number(res.headers["x-total-count"]));
    };
    getTodo();
  }, [page, limit]);
  return (
    <div className="App">
      {todos.map((todo) => (
        <div key={todo}>
          {todo.id}
          {`" "`}
          {todo.value}
        </div>
      ))}
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {"<"}
      </button>
      <select onChange={(e) => setLimit(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <button
        disabled={page * limit > totalCount}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Todos;
