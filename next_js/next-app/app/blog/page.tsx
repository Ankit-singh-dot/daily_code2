"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    const fetchTodo = async () => {
      const res = await axios.get("https://dummyjson.com/todos");
      setTodo(res.data.todos);
    };
    fetchTodo();
  }, []);
  return (
    <div>
      <h2>Todo list </h2>
      {todo.map((todo) => (
        <div key={todo.id}>
          <p>
            <b>Task:</b> {todo.todo}
          </p>
          <p>
            <b>Status:</b> {todo.completed ? "Completed" : "Pending"}
          </p>
          <p>
            <b>User ID:</b> {todo.userId}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
