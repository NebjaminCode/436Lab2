import { useContext } from "react";
import { StateContext } from "../../contexts";
import { useParams, useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(StateContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "CLEAR_TODOS" });
        dispatch({ type: "LOGOUT" });
       navigate(`/`);
      }} className="text-primary"
    >
      Logged in as: <b>{state.user.username}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}

