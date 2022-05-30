import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../../redux/actions/employeeActions";
import { viewEmployee } from "../../redux/actions/employeeActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useParams();

  const [employee, setEmployee] = useState({
    ename: "",
    designation: "",
    email: "",
    location: "",
    experince: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const singleEmployee = useSelector((state) => state.employee.singleEmployee);

  useEffect(() => {
    if (id) {
      dispatch(viewEmployee(id));
    }
  }, [id]);

  useEffect(() => {
    setEmployee({ ...singleEmployee });
  }, [singleEmployee]);

  const inputChnage = (e) => {
    let { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editEmployee({
        employee,
      })
    );
    toast.success("Employee Edit successfully");
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <>
      {" "}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ textAlign: "left" }}>Edit Employee</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <ValidatorForm onSubmit={onSubmit}>
              <TextField
                label="Employee Name"
                name="ename"
                onChange={inputChnage}
                value={employee.ename}
              />
              <br /> <br />
              <TextField
                label="Designation"
                onChange={inputChnage}
                name="designation"
                value={employee.designation}
                validators={["required"]}
                errorMessages={["Designation field is required"]}
              />
              <br /> <br />
              <TextField
                label="Email"
                onChange={inputChnage}
                name="email"
                value={employee.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Email field is required",
                  "Email is not valid",
                ]}
              />
              <br /> <br />
              <TextField
                label="Location"
                onChange={inputChnage}
                name="location"
                value={employee.location}
                validators={["required"]}
                errorMessages={["Location field is required"]}
              />
              <br /> <br />
              <TextField
                label="Experince"
                onChange={inputChnage}
                name="experince"
                value={employee.experince}
                validators={["required"]}
                errorMessages={["Experince field is required"]}
              />
              <br /> <br />
              <TextField
                label="Phone"
                onChange={inputChnage}
                name="phone"
                value={employee.phone}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "Phone field is required",
                  "Only number is required",
                ]}
              />
              <br /> <br />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={submitted}
              >
                {(submitted && "Your form is submitted!") ||
                  (!submitted && "Submit")}
              </Button>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </>
  );
};
