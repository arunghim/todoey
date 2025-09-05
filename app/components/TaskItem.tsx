"use client";

import React from "react";

type TaskItemProps = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <li className="flex items-center">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
          marginLeft: "8px",
        }}
      >
        {text}
      </span>
      <button onClick={() => onDelete(id)} style={{ marginLeft: "8px" }}>
        Delete
      </button>
    </li>
  );
}
