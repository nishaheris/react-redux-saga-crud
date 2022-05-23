import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/loginActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Email: eve.holt@reqres.in
// Password: cityslicka

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorFields, setError] = useState("");
  const [checkLogin, setCheckLogin] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    if (checkLogin) {
      if (isLogin) {
        navigate("/dashboard");
        localStorage.setItem("userLogin", true);
      } else {
        toast.error("User Not Found");
      }
    }
  }, [checkLogin, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setError("Please enter email and password fields");
    } else {
      dispatch(loginUser(login));
      setCheckLogin(true);
    }
  };

  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="../../index2.html" className="h1">
                <b>Login </b>
              </a>
            </div>
            {errorFields && <h3 style={{ color: "red" }}> {errorFields}</h3>}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                  />
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
