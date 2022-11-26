import { useContext } from "react";
import { StateContext } from "../../contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "CLEAR_TODOS" });
        dispatch({ type: "LOGOUT" });
      }} className="text-primary"
    >
      Logged in as: <b>{state.user.username}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}
