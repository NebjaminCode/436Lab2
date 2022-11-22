import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { useParams, useNavigate } from "react-router-dom";

import { StateContext } from "../contexts";

import Todo from "../Components/todo/Todo";

export default function TodoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useContext(StateContext);

  const [todo, getTodos] = useResource(() => ({
    url: `/todo/${id}`,
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));
  useEffect(getTodos, [id]);

  //   useEffect(() => {
  //     if (todo.isLoading === false && todo.data) {
  //       navigate(`/todo/${todo.data.id}`);
  //     }
  //   }, [todo.data]);

  return (
    <div>{todo && todo.data ? <Todo {...todo.data} /> : "Loading..."}</div>
  );
}
