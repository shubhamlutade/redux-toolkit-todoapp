import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  text: string;
};

type TodoState = {
  todos: Todo[];
  editingTodo: Todo | null;
  buttonLabel: string;
  mode: "add" | "update";
};

const initialState: TodoState = {
  todos: [{ id: "1", text: "Learn Redux Toolkit" }],
  editingTodo: null,
  buttonLabel: "Add",
  mode: "add",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      if (state.editingTodo?.id === action.payload) {
        state.editingTodo = null;
        state.buttonLabel = "Add";
        state.mode = "add";
      }
    },
    setEditingTodo: (state, action: PayloadAction<Todo | null>) => {
      state.editingTodo = action.payload;
      state.buttonLabel = action.payload ? "Update" : "Add";
      state.mode = action.payload ? "update" : "add";
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const { id, text } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text;
      }
    },
  },

  //state contains all the current values inside the initialState and action contains the payload that is passed to the reducer function
});

export const { addTodo, removeTodo, setEditingTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
