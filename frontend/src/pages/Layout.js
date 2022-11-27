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
          <Link to="/" style={{ textDecoration: 'none', paddingLeft: '5%' }}>
            <Header title="Todo" />
          </Link>
        </Navbar.Brand>
      </Container>
        
      <React.Suspense fallback={"Loading..."}>
          <UserBar />
      </React.Suspense>{" "}
    </Navbar>
        <div  className="p-3 mb-2 bg-secondary text-white" id="content" style={{ minHeight: '100vh'}}>
          <br />
            
          {/* <div id="bloop" className="p-3 mb-2 bg-light text-dark" style={{margin: 'auto', paddingLeft: "1em", paddingRight: "1em", borderRadius: "1em", width: '50%', textAlign: 'center', marginTop: "5em", marginBottom: "2em"}} >
              {(user) && <Link to="/todo/create" style={{ textDecoration: 'none'}}>Create New Todo</Link>}
          </div> */}

          {(user) && <Link to="/todo/create" style={{ textDecoration: 'none'}}>
            <div className="p-3 mb-4 bg-light text-dark" style={{textDecoration: 'none', margin: 'auto', paddingLeft: "1em", paddingRight: "1em", borderRadius: "1em", textAlign: 'center', marginTop: "7em"}} >
              Create New Todo
            </div>
          </Link>}

          <Outlet />
      </div>  
    </>
    
  );
}
