import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../../contexts";

function Login() {
  // local statehook to keep track of what the user types into the username input
  const [username, setUsername] = useState("");
  const { dispatch } = useContext(StateContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  useEffect(() => {
    if (user?.data?.user) {
      setLoginFailed(false);
      dispatch({ type: "LOGIN", username: user.data.user.email });
    }

    if (user?.error) {
      console.log("user.error = " + user.error.data);
      setLoginFailed(true);
    }
  }, [user]);

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
      <form
        onSubmit={(e) => {
          // on submit of form, we:
          // prevent reloading
          e.preventDefault();

          login(username, password);
          // dispatch a LOGIN action and pass in the username (which was taken from local statehook)
          // dispatch({ type: "LOGIN", username });
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
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          name="login-password"
          id="login-password"
        />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}

export default Login;
