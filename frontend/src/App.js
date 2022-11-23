import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";

import CreateTodo from "./Components/todo/CreateTodo";
import appReducer from "./Reducers";
import { StateContext } from "./contexts";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import TodoPage from "./pages/TodoPage";

// wouldn't work without this for some reason? figured it would have been automaticlly linked or something
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  return (
    <div style={{ background: "chocolate"}} id="secondFromRoot">
      <Container style={{}}>
        <StateContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/todo" element={<Layout />}>
                <Route path="/todo/create" element={<CreateTodo />} />
                <Route path="/todo/:id" element={<TodoPage />} />
                <Route path="*" element={<HomePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StateContext.Provider>
      </Container>
    </div>
  );
}

export default App;
