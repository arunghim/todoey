"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/NavBar";
import TaskItem from "@/app/components/TaskItem";
import { Todo } from "@/app/types";

export default function DeletedPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const removeTodo = (id: number) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const undoTodo = (id: number) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, deleted: false } : t
    );
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const deletedTodos = todos.filter((t) => t.deleted);

  return (
    <div>
      <Navbar />
      <div>
        <h1>Deleted Tasks</h1>
        {deletedTodos.length === 0 ? (
          <p>No deleted tasks.</p>
        ) : (
          <ul>
            {deletedTodos.map((todo) => (
              <li key={todo.id}>
                <TaskItem
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={() => {}}
                  onDelete={() => removeTodo(todo.id)}
                />
                <button onClick={() => undoTodo(todo.id)}>Undo</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
