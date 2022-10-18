import { useState } from "react";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  complete,
  dispatch,
  id,
  dateCompleted,
}) {
  // const [complete, setComplete] = useState(false);
  // const [dateCompleted, setDateCompleted] = useState(Date());

  return (
    <div>
      <h3>{title}</h3>
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      <div>{description}</div>
      <br />

      {<div>Date Created: {dateCreated}</div>}
      {<div>Date Completed: {complete ? dateCompleted : "get to work!"}</div>}
      <div>
        Complete? {complete ? "Yes" : "No"}
        <input
          id="completeCheck"
          type="checkbox"
          onChange={(event) => {
            dispatch({ type: "TOGGLE_TODO", id });
            //setComplete((event.target.value = !complete));
          }}
        />
      </div>

      <div>
        <button
          id="deleteButton"
          onClick={(event) => {
            if (complete) {
              dispatch({ type: "DELETE_TODO", id });
            }
          }}
        >
          Delete Completed Todo?
        </button>
      </div>

      <br />
    </div>
  );
}
