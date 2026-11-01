import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import "./App.css";

function App() {
  return (
    <main className="app">
      <h1>My Todos</h1>
      <AddTodo />
      <Todos />
    </main>
  );
}

export default App;
