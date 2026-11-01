import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  setEditingTodo,
  updateTodo,
} from "../features/todo/todoSlice";
import type { RootState } from "../app/store";
import "./AddTodo.css";

function AddTodo() {
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();
  const editingTodo = useSelector((state: RootState) => state.editingTodo);
  const buttonLabel = useSelector((state: RootState) => state.buttonLabel);

  const addToDoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = inputValue.trim();
    if (!text) return;

    if (editingTodo) {
      dispatch(updateTodo({ id: editingTodo.id, text }));
      dispatch(setEditingTodo(null));
    } else {
      dispatch(addTodo(text));
    }
    setInputValue("");
  };

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text);
    } else {
      setInputValue("");
    }
  }, [editingTodo]);

  return (
    <form onSubmit={addToDoHandler} className="add-todo-form">
      <label htmlFor="todo-input">New todo</label>
      <div className="add-todo-form__controls">
        <input
          id="todo-input"
          name="todo"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">{buttonLabel}</button>
      </div>
    </form>
  );
}

export default AddTodo;
