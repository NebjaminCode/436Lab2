import Todo from "./Todo";

export default function PostTodo({ posts = [] }) {
  return (
    <div>
      {posts.map((p, i) => (
        <Todo {...p} key={p.id} />
      ))}
    </div>
  );
}
