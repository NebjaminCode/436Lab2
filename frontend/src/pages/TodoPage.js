import React, { useEffect, useContext } from "react";
import { useResource } from "react-request-hook";
import { useParams, useNavigate } from "react-router-dom";

import { StateContext } from "../contexts";

import Todo from "../Components/todo/Todo";

export default function TodoPage() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { state, dispatch } = useContext(StateContext);

  const [todo, getTodos] = useResource(() => ({
    url: `/todo/${_id}`,
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));
  useEffect(getTodos, [_id]);

  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      navigate(`/todo/${todo.data._id}`);
    }
  }, [todo.data]);

  return (
    
    <div>{todo && todo.data ? <Todo {...todo.data} /> : "Loading..."}</div>

  );
}
