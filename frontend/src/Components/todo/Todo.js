import { useState, useResource, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Todo({
  title,
  description,
  author,
  dateCreated,
  complete,
  dispatch,
  _id,
  dateCompleted,
}) {
  // const [complete, setComplete] = useState(false);
  // const [dateCompleted, setDateCompleted] = useState(Date());

  return (
    <div>
      <Link to={`/todo/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      <div>{description}</div>
      <br />

      {<div>Date Created: {dateCreated}</div>}
      {<div>Date Completed: {complete ? dateCompleted : "N/A"}</div>}
      <div>
        Complete? {complete ? "Yes" : "No"}
        <input
          id="completeCheck"
          type="checkbox"
          onChange={(event) => {
            dispatch({ type: "TOGGLE_TODO", _id });
            //setComplete((event.target.value = !complete));
          }}
        />
      </div>

      <div>
        <button
          id="deleteButton"
          onClick={(event) => {
            if (complete) {
              dispatch({ type: "DELETE_TODOS", _id });
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

export default React.memo(Todo);
