import React, { useContext, useState } from "react";
import { StateContext } from "../../contexts";

import Login from "./Login";
import Register from "./Register";
const Logout = React.lazy(() => import("./Logout"));

export default function UserBar() {
  const { state } = useContext(StateContext);
  // const [formType, typeUpdate] = useState(true);

  if (state.user) {
    return <Logout />;
  } else {
    return (
      <>
        {/*         
          {/* create button that renders login or register */}
        {/* <button
          id="registerORlogin"
          onClick={() => {
            typeUpdate(false);
          }}
        />
        {formType === true ? <Login /> : <Register />} */}

        <Login />
        <Register />
      </>
    );
  }
}
