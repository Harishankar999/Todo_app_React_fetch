import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import axios from "axios";

function Todos() {
  const [todos, setTodos] = useState([]);
  // const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    getTodo()
  }, [page]);

  const getTodo = () => {
    setIsLoading(true);
    return fetch(`https://d3h11l.sse.codesandbox.io/alltodos?_page=${page}&_limit=3`)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const addTodos =  (value) => {
    const payload = {
      value,
      isComplete:false,
    }
    setIsLoading(true);
    return fetch(`https://d3h11l.sse.codesandbox.io/alltodos`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((res) => {
      return getTodo();
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return isLoading ? (
    <div>...loading</div>
  ) : isError ? (
    <div>Something Went wrong</div>
  ) : (
    <div>
      <h1>Todos App</h1>
      <h3>Page</h3>
      <button disabled={page===1} onClick={() => setPage(page-1)}>{"<"}</button>
      <button disabled={page>=page*todos.length} onClick={() => setPage(page+1)}>{">"}</button>
      <div>
        <input value={value} onChange={(e)=>setValue(e.target.value)} className="inputtag" />
        <br />
        <br />
        <button onClick={() =>addTodos(value)}>SAVE</button>
        <div>
          {todos.map((item) => {
            return <div key={item.id}>{item.value}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Todos;
