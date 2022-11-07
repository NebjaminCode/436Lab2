import { v4 as uuidv4 } from "uuid";
import { /*useState,*/ useReducer } from "react";
import UserBar from "./Components/User/UserBar";
import TodoList from "./Components/todo/TodoList";
import CreateTodo from "./Components/todo/CreateTodo";
import appReducer from "./Reducers";
import { StateContext } from "./contexts";

function App() {
  const defaultTodos = [
    {
      title: "first todo",
      description: "first description",
      author: "Ben",
      id: uuidv4(),
      dateCreated: Date(Date.now()),
    },
    {
      title: "second todo",
      description: "second description",
      author: "Ben",
      id: uuidv4(),
      dateCreated: Date(Date.now()),
    },
  ];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: defaultTodos,
  });

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <TodoList />
        {state.user && <CreateTodo />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
