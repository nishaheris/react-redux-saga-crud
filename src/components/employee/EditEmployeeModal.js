import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { ValidatorForm } from "react-material-ui-form-validator";

const EditEmployeeModal = ({
  setShowEditModal,
  hideModalEdit,
  onSubmit,
  inputChnage,
  employeeData,
  errorMsg,
}) => {
  return (
    <Modal
      show={setShowEditModal}
      onHide={hideModalEdit}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <ValidatorForm onSubmit={onSubmit}>
              <TextField
                label="Employee Name"
                name="ename"
                onChange={inputChnage}
                value={employeeData.ename}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.ename}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <TextField
                label="Designation"
                name="designation"
                onChange={inputChnage}
                value={employeeData.designation}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.designation}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <TextField
                label="Email"
                name="email"
                validators={["required", "isEmail"]}
                onChange={inputChnage}
                value={employeeData.email}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.email}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <TextField
                label="Location"
                name="location"
                onChange={inputChnage}
                value={employeeData.location}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.location}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <TextField
                label="Experince"
                name="experince"
                onChange={inputChnage}
                value={employeeData.experince}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.experince}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <TextField
                label="Phone"
                name="phone"
                onChange={inputChnage}
                value={employeeData.phone}
              />
              {errorMsg ? (
                <span style={{ color: "red" }}>{errorMsg.phone}</span>
              ) : (
                ""
              )}
              <br /> <br />
              <Button color="primary" type="submit">
                {" "}
                Edit
              </Button>
            </ValidatorForm>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModalEdit}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmployeeModal;
