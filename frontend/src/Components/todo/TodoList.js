import { useContext } from "react";

import Todo from "./Todo";
import { StateContext } from "../../contexts";

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const { todos } = state;
  const { user } = state;

  return (
    <div>
      {user && todos.length === 0 && <h2>Ya done boyo</h2>}
      {todos.length > 0 && todos.map((p, i) => <Todo {...p} key={p._id} />)}
      {/* {todos.map((t, i) => (
        <Todo {...t} key={t.id} dispatch={dispatch} />
      ))} */}
    </div>
  );
}
