import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

import { StateContext } from "../../contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [dateCreated, setDateCreated] = useState(Date()); -- unnecessary, won't change

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(({ title, description, author }) => ({
    url: "/todos",
    method: "post",
    data: { title, description, author },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createTodo({ title, description, author: user });

        dispatch({
          type: "CREATE_TODO",
          title,
          description,
          author: user,
          id: uuidv4(),
          dateCreated: Date(),
          dateCompleted: "foo",
          complete: false,
        });
      }}
    >
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}
