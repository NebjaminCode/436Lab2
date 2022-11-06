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
        <UserBar user={state.user} dispatch={dispatch} />
        <TodoList todos={state.todos} dispatch={dispatch} />
        {state.user && (
          <CreateTodo
            user={state.user}
            todos={state.todos}
            dispatch={dispatch}
          />
        )}
      </StateContext.Provider>
    </div>
  );
}

export default App;
