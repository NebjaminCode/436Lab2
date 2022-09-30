export default function Todo({ title, description, author }) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      <h5>{author}</h5>
    </div>
  );
}
