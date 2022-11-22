import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";

import CreateTodo from "./Components/todo/CreateTodo";
import appReducer from "./Reducers";
import { StateContext } from "./contexts";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import TodoPage from "./pages/TodoPage";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  return (
    <div>
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
    </div>
  );
}

export default App;
