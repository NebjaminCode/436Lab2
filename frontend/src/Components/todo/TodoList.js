import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch }) {
  return (
    <div>
      {todos.map((t, i) => (
        <Todo {...t} key={t.id} dispatch={dispatch} />
      ))}
    </div>
  );
}
