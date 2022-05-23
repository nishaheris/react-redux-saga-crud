import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Aboutus } from "./components/Aboutus";
import { AddEmployee } from "./employee/AddEmployee";
import { EditEmployee } from "./employee/EditEmployee";
import ViewEmployee from "./employee/ViewEmployee";
import { Login } from "./components/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./public/plugins/fontawesome-free/css/all.min.css";
import "./public/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./public/dist/css/adminlte.min.css";
import "./public/custom.css";
import PrivateRoute from "./components/PrivateRoute";
import { Navbar } from "react-bootstrap";
// import "./public/plugins/jquery/jquery.js";
// import "./public/plugins/bootstrap/js/bootstrap.bundle.min.js";
//import "./public/dist/js/adminlte.min.js";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/employee/add" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<ViewEmployee />} />
            <Route path="/employee/edit/:id" element={<EditEmployee />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
