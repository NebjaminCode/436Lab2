import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResource } from "react-request-hook";

import { StateContext } from "../../contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  //const [dateCreated, setDateCreated] = useState(Date()); -- unnecessary, won't change

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, description, author, dateCreated }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, description, dateCreated },
    })
  );

  useEffect(() => {
    if (todo?.error) {
      setError(true);
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        author: user.username,
        id: todo.data.id,
        dateCreated: todo.data.dateCreated,
        //dataCompleted: "foo",
        complete: false,
        description: todo.data.description,
      });
    }
  }, [todo]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createTodo({
          title,
          description,
          author: user,
          dateCreated: Date(),
        });
        // commented out and moved to effect hook above
        // dispatch({
        //   type: "CREATE_TODO",
        //   title,
        //   description,
        //   author: user,
        //   id: uuidv4(),
        //   dateCreated: Date(),
        //   dateCompleted: "foo",
        //   complete: false,
        // });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
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
