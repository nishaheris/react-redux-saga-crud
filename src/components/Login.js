import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./modals/Signup";
import { useFormik } from "formik";
import { signupStart } from "../redux/actions/signupAction";

// Email: eve.holt@reqres.in
// Password: cityslicka

export const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("userLogin")) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  const dispatch = useDispatch();
  const [emailFields, setEmailError] = useState("");
  const [passwordFields, setPasswordError] = useState("");
  const isLogin = useSelector((state) => state.login.isLogin);
  const isLoginError = useSelector((state) => state.login.error);
  const [showModal, setShowModal] = useState(false);

  const [checkLogin, setCheckLogin] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmailError("");
    } else if (e.target.name === "password") {
      setPasswordError("");
    }
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setEmailError("Please enter email");
      setPasswordError("Please enter password");
    } else {
      localStorage.setItem("userEmail", login.email);
      dispatch(loginUser(login));
      setCheckLogin(true);
    }
  };

  useEffect(() => {
    if (checkLogin) {
      if (isLogin) {
        navigate("/dashboard");
        localStorage.setItem("userLogin", true);
      } else {
        if (isLoginError && isLoginError !== "") {
          toast.error(isLoginError);
        }
      }
    }
  }, [checkLogin, isLogin, isLoginError]);

  const handleSignup = () => {
    setShowModal(true);
  };

  const modalHide = () => {
    setShowModal(false);
  };

  const validators = (item) => {
    let errorsDisp = {};

    if (!item.firstname) {
      errorsDisp.firstname = "First name is required.";
    }
    if (!item.lastname) {
      errorsDisp.lastname = "Last name is required.";
    }
    if (!item.email) {
      errorsDisp.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(item.email)
    ) {
      errorsDisp.email = "Invalid Email";
    }
    return errorsDisp;
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    onSubmit: (values) => {
      dispatch(signupStart(values));
      setTimeout(() => {
        navigate("/");
        toast.success("Signup successfully");
      }, 500);
      setShowModal(false);
    },
    validate: validators,
  });

  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a className="h1">
                <b>Login </b>
              </a>
            </div>
            <Signup
              setShowModal={showModal}
              hideModal={modalHide}
              formik={formik}
            />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleInputChange}
                  />
                  {emailFields && (
                    <span
                      style={{
                        color: "red",
                        font: "5px",
                      }}
                    >
                      <p>{emailFields}</p>
                    </span>
                  )}
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleInputChange}
                  />
                  {passwordFields && (
                    <p style={{ color: "red", font: "5px" }}>
                      {passwordFields}
                    </p>
                  )}
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={handleSignup}
                >
                  Sign Up
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
