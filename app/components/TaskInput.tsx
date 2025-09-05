import React from "react";

type TaskInputProps = {
  input: string;
  setInput: (value: string) => void;
  onAdd: () => void;
};

export default function TaskInput({ input, setInput, onAdd }: TaskInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter new task"
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
}
