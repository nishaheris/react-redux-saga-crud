import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logOutUser } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/userprofileAction";
import profileImage from "../public/images/react.png";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useLogdin = localStorage.getItem("userLogin");
  const userEmail = localStorage.getItem("userEmail");
  const profileData = useSelector((state) => state.userprofile.userprofile);

  useEffect(() => {
    if (useLogdin) {
      dispatch(getUserProfile());
    }
  }, [useLogdin]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    dispatch(logOutUser());
    navigate("/");
    navigate(0);
  };
  return (
    <>
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{
          minHeight: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <a href="index3.html" className="brand-link">
          <span className="brand-text font-weight-light">{userEmail}</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={profileImage}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a className="d-block" style={{ textAlign: "center" }}>
                {profileData.firstname} {profileData.lastname}
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </NavLink>
              </li>

              <li className="nav-item menu-open">
                <NavLink to="/about" className="nav-link">
                  <i className="nav-icon fas fa-info"></i>
                  <p>About Us</p>
                </NavLink>
              </li>

              <li className="nav-item menu-open">
                <NavLink to="/profile" className="nav-link">
                  <i className="nav-icon fas fa-user"></i>
                  <p>Profile</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <p
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "default" }}
                >
                  <i className="nav-icon fas fa-clock"></i>
                  <p>Logout</p>
                </p>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
