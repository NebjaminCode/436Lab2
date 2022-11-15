import { v4 as uuidv4 } from "uuid";
import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";

import UserBar from "./Components/User/UserBar";
import TodoList from "./Components/todo/TodoList";
import CreateTodo from "./Components/todo/CreateTodo";
import appReducer from "./Reducers";
import Header from "./Header";
import { StateContext } from "./contexts";

function App() {
  const defaultTodos = [];
  /*
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
*/
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: defaultTodos,
  });
  /*
  useEffect(() => {
    fetch("/api/todos")
      .then((result) => result.json())
      .then((todos) => dispatch({ type: "FETCH_TODOS", todos }));
  }, []);
*/
  const [todos, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <Header title="ToDo" />
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>
        <TodoList />
        {state.user && <CreateTodo />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
