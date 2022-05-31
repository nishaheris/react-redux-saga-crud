import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { addEmployee } from "../../redux/actions/employeeActions";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      toast.success("Employee added successfully");
    }
  };

  const { ename, designation, email, location, experince, phone } = employee;
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 style={{ textAlign: "left" }}>Add Employee</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <ValidatorForm onSubmit={onSubmit}>
            <TextValidator
              label="Employee Name"
              onChange={(e) => inputChnage(e)}
              name="ename"
              value={employee.ename}
              validators={["required"]}
              errorMessages={["Employee name field is required"]}
            />
            <br />
            <TextValidator
              label="Designation"
              onChange={(e) => inputChnage(e)}
              name="designation"
              value={employee.designation}
              validators={["required"]}
              errorMessages={["Designation field is required"]}
            />
            <br />
            <TextValidator
              label="Email"
              onChange={(e) => inputChnage(e)}
              name="email"
              value={employee.email}
              validators={["required", "isEmail"]}
              errorMessages={["Email field is required", "Email is not valid"]}
            />
            <br />
            <TextValidator
              label="Location"
              onChange={(e) => inputChnage(e)}
              name="location"
              value={employee.location}
              validators={["required"]}
              errorMessages={["Location field is required"]}
            />
            <br />
            <TextValidator
              label="Experince"
              onChange={(e) => inputChnage(e)}
              name="experince"
              value={employee.experince}
              validators={["required"]}
              errorMessages={["Experince field is required"]}
            />
            <br />
            <TextValidator
              label="Phone"
              onChange={(e) => inputChnage(e)}
              name="phone"
              value={employee.phone}
              validators={["required", "isNumber"]}
              errorMessages={[
                "Phone field is required",
                "Only number is required",
              ]}
            />
            <br />
            <Button color="primary" variant="contained" type="submit">
              {" "}
              Submit
            </Button>
          </ValidatorForm>
        </div>
      </div>
    </div>
  );
};
