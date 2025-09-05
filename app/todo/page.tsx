"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import TaskInput from "@/app/components/TaskInput";
import TaskItem from "@/app/components/TaskItem";
import { Todo } from "@/app/types";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, deleted: true } : t)));
  };

  return (
    <div>
      <Navbar />
      <div>
        <h1>To-Do List</h1>
        <TaskInput input={input} setInput={setInput} onAdd={addTodo} />
        <ul>
          {todos
            .filter((t) => !t.completed && !t.deleted)
            .map((todo) => (
              <TaskItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
