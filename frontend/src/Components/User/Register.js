import { useState, useContext, useEffect } from "react";
import { StateContext } from "../../contexts";
import { useResource } from "react-request-hook";

export default function Register() {
  // local statehooks to keep track of text input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const { dispatch } = useContext(StateContext);

  // old handleXXXX functions, replaced by lambdas below
  //   function handleUsername(evt) {
  //     setUsername(evt.target.value);
  //   }
  //   function handlePassword(evt) {
  //     setPassword(evt.target.value);
  //   }
  //   function handlePasswordRepeat(evt) {
  //     setPasswordRepeat(evt.target.value);
  //   }

  const [user, register] = useResource((username, password) => ({
    url: "/users",
    method: "post",
    data: { email: username, password },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.user.email });
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(username, password);
        // dispatch({ type: "REGISTER", username});
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label htmlFor="register-password-repeat">Repeat Password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordRepeat}
        onChange={(event) => setPasswordRepeat(event.target.value)}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
    </form>
  );
}
