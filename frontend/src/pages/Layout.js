import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import UserBar from "../Components/User/UserBar";
import { StateContext } from "../contexts";
import Header from "../Header";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Layout() {
  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <>
    <Navbar bg="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Header title="ToDo" />
          </Link>
          </Navbar.Brand>
          </Container>
        
        
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>{" "}
        </Navbar>
        <div  class="p-3 mb-2 bg-secondary text-white" id="content">
            <br />
            <div id="bloop" style={{marginTop: "4em"}} >
            {(user) && <Link to="/todo/create" style={{ textDecoration: 'none' }}>Create New Todo</Link>}
        </div>
      <Outlet />
      </div>  
    </>
    
  );
}
