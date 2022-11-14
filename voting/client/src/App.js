import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import UserRoutes from "./components/routes/UserRoutes";
import Home from "./Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<UserRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
