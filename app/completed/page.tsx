"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import TaskItem from "@/app/components/TaskItem";
import { Todo } from "@/app/types";

export default function CompletedPage() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, deleted: true } : t)));
  };

  const completedTodos = todos.filter((t) => t.completed && !t.deleted);

  return (
    <div>
      <Navbar />
      <div>
        <h1>Completed Tasks</h1>
        {completedTodos.length === 0 ? (
          <p>No completed tasks yet.</p>
        ) : (
          <ul>
            {completedTodos.map((todo) => (
              <TaskItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
