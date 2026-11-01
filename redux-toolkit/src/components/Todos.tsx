import "./Todos.css";

import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, setEditingTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span className="todo-item__text">{todo.text}</span>
          <div className="todo-item__actions">
            <button
              onClick={() => dispatch(setEditingTodo(todo))}
              type="button"
            >
              Update
            </button>
            <button
              onClick={() => {
                dispatch(removeTodo(todo.id));
              }}
              type="button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
