import React, { useState, useContext } from "react";
import { StateContext } from "../../contexts";

function Login() {
  // local statehook to keep track of what the user types into the username input
  const [username, setUsername] = useState("");
  const { dispatch } = useContext(StateContext);

  return (
    <form
      onSubmit={(e) => {
        // on submit of form, we:
        // prevent reloading
        e.preventDefault();
        // dispatch a LOGIN action and pass in the username (which was taken from local statehook)
        dispatch({ type: "LOGIN", username });
      }}
    >
      <label htmlFor="login-username">Username:</label>
      <input
        type="text"
        value={username}
        // for every new character entered into the input, update username from local statehook - replaced handleUsername with this lambda
        onChange={(event) => setUsername(event.target.value)}
        name="login-username"
        id="login-username"
      />
      <label htmlFor="login-password">Password:</label>
      <input type="password" name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}

export default Login;
