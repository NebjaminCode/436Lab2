import { useState } from "react";

export default function Register({ dispatch }) {
  // local statehooks to keep track of text input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER", username });
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