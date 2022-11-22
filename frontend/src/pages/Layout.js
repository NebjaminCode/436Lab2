import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import UserBar from "../Components/User/UserBar";
import { StateContext } from "../contexts";
import Header from "../Header";

export default function Layout() {
  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <>
      <Link to="/">
        <Header title="ToDo" />
      </Link>
      <React.Suspense fallback={"Loading..."}>
        <UserBar />
      </React.Suspense>{" "}
      <br />
      {user && <Link to="/todo/create">Create New Todo</Link>}
      <Outlet />
    </>
  );
}
