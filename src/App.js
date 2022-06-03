import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Aboutus } from "./components/Aboutus";
import { AddEmployee } from "./components/employee/AddEmployee";
import { EditEmployee } from "./components/employee/EditEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import { Login } from "./components/Login";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./public/plugins/fontawesome-free/css/all.min.css";
import "./public/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./public/dist/css/adminlte.min.css";
import "./public/custom.css";
import PrivateRoute from "./components/PrivateRoute";
import "./public/plugins/jquery/jquery.js";
import "./public/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./public/dist/js/adminlte.min.js";
import Layout from "./layout/Layout";
import UserProfile from "./components/UserProfile";
import Products from "./components/products/Products";
import PaginationEmployee from "./components/PaginationEmployee";
const LayContact = React.lazy(() => import("./components/Contactus"));

function App() {
  useSelector((state) => state.login.isLogin);
  const userLogin = localStorage.getItem("userLogin");

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        {userLogin ? <Layout /> : ""}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route
              path="/contactus"
              element={
                <React.Suspense fallback="Loading...">
                  <LayContact />
                </React.Suspense>
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/employee/add" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<ViewEmployee />} />
            <Route path="/employee/edit/:id" element={<EditEmployee />} />
            <Route
              path="/pagination-employee"
              element={<PaginationEmployee />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
