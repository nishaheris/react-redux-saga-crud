import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Email: eve.holt@reqres.in
// Password: cityslicka

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLogin")) {
      navigate("/dashboard");
    }
  }, []);

  const dispatch = useDispatch();
  const [emailFields, setEmailError] = useState("");
  const [passwordFields, setPasswordError] = useState("");

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
  const isLogin = useSelector((state) => state.login.isLogin);
  const isLoginError = useSelector((state) => state.login.error);

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

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="use this eve.holt@reqres.in"
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
                    placeholder="Password"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
