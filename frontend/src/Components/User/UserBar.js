import React, { useContext, useState } from "react";
import { StateContext } from "../../contexts";
import Container from "react-bootstrap/Container";

import Login from "./Login";
import Register from "./Register";
const Logout = React.lazy(() => import("./Logout"));

export default function UserBar() {
  const { state } = useContext(StateContext);
  // const [formType, typeUpdate] = useState(true);

  if (state.user) {
    return (
      <Container>
        <Logout />
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <Container>
            <Login />
          </Container>
          <Container>
            <Register />
          </Container>
        </Container>
      </>
    );
  }
}
