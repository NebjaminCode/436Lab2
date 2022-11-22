import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import TodoList from "../Components/todo/TodoList";

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));
  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (user && todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
  }, [todos]);
  return (
    <>
      {todos?.isLoading && "Todos loading..."} <TodoList />
    </>
  );
}
