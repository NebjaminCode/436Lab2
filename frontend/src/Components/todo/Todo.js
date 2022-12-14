import { useEffect, useContext } from "react";
import {useResource} from 'react-request-hook';
import React from "react";
import { StateContext } from "../../contexts";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';

function Todo({
  title, description, author, dateCreated, dateCompleted, complete, _id
}) {

  const {state, dispatch } = useContext(StateContext);
  // const [completeState, toggleCompleteState] = useState(complete);

  const [toUpdate, toggleTodoHook] = useResource((title, description, author, dateCreated, dateCompleted, complete, _id) => ({
    url: `/todo/${_id}`,
    method: "patch",
    headers: {Authorization: `${state.user.access_token}`},
    data: {title, description, author, dateCreated, dateCompleted, complete, _id} 
  }));

  const [toDelete, deleteTodo] = useResource((_id) => ({
    url: `/todo/${_id}`,
    method: "delete",
    headers: {Authorization: `${state.user.access_token}`},
  }));


  function toggleTodo(title, description, author, dateCreated, dateCompleted, complete, _id, newdateCompleted) {
    complete = !complete;
    if (complete === true) {
      dateCompleted = newdateCompleted;
    } else {
      dateCompleted = "N/A";
    }
    toggleTodoHook(title, description, author, dateCreated, dateCompleted, complete, _id);
  }


  // function toggleTodoComplete(title, description, author, complete, _id, dateCreated) {
  //   let newDateCompleted = new Date().toString();
  //   if (!complete) {
  //     dateCompleted = newDateCompleted;
  //   } else {
  //     dateCompleted = "N/A"
  //   }
  //   complete = !complete;
  //   console.log("bloop");

  //   updateTodo(title, description, author, dateCreated, dateCompleted, complete, _id);
  //   dispatch({
  //     type: "TOGGLE_TODO", 
  //     id: _id, 
  //     complete, 
  //     dateCompleted });
  // }


  useEffect(()=>{
    if(toUpdate.isLoading === false && toUpdate?.data){
        dispatch({
            type: "TOGGLE_TODO",
            _id:toUpdate.data._id,
            author:toUpdate.data.author,
            title:toUpdate.data.title,
            dateCreated:toUpdate.data.dateCreated,
            dateCompleted: toUpdate.data.dateCompleted,
            complete:toUpdate.data.complete,
            description:toUpdate.data.description, 
        });
    }
},[toUpdate])

  return (
    <div id="TodosInTodoTodo" className="p-3 mb-2 bg-light text-dark" style={{ borderRadius: '1em' }}>

{/* div for todo and author */}      
      <div>
        
        <Link to={`/todo/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <h4>{title}</h4>
        </Link>

        <h6>
          Written by <b>{state.user.username}</b>
        </h6>
      </div>

{/* dates */}
      <div>
        {<div>Date Created: {dateCreated}</div>}
        {<div>Date Completed: {complete ? dateCompleted : "N/A"}</div>}
      </div>

{/* description */}
      <div>
      <div className="p-3 mb-2 bg-light text-dark">{description}</div>
      </div>

<div style={{display:'flex',  alignSelf:'center'}}>
      <div>
        <Button variant="secondary" onClick={(e) => {
            let newdateCompleted = new Date().toLocaleString();
            toggleTodo(title, description, author, dateCreated, dateCompleted, complete, _id, newdateCompleted);
            // dispatch({ type: "TOGGLE_TODO", _id });
          }}>{complete ? "Complete!" : "Complete?"}</Button>{' '}
      </div>
 
      <div style={{marginLeft:'auto'}}>

      <Button id="deleteButton" variant="secondary" 
      onClick={(e) => {
              if (complete) {
                deleteTodo(_id);
                dispatch({ type: "DELETE_TODOS", _id });
              }
        }}
      >
        Delete Completed Todo?  
        </Button>{' '}

      </div>
</div>
      <br />
    </div>
  );
}

export default React.memo(Todo);
