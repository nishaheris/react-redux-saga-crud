import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../redux/actions/employeeActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => {
    // Calling toast method by passing string
    setTimeout(() => {
      toast.success("Employee added successfully");
    }, 1000);
  };

  const [employee, setEmployee] = useState({
    ename: "",
    designation: "",
    email: "",
    location: "",
    experince: "",
    phone: "",
  });

  const inputChnage = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (ename && designation && email && location && experince && phone) {
      dispatch(addEmployee(employee));
      setTimeout(() => navigate("/dashboard"), 500);
    }
  };

  const { ename, designation, email, location, experince, phone } = employee;
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Employee</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="ename"
              placeholder="Employee name"
              value={ename}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="designation"
              placeholder="Designation"
              value={designation}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="experince"
              placeholder="experince"
              value={experince}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              name="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => inputChnage(e)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={notify}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
