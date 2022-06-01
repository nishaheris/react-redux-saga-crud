import React from "react";
import { Button, Modal } from "react-bootstrap";

const Signup = ({ setShowModal, hideModal, formik }) => {
  return (
    <Modal show={setShowModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-12 mt-4">
            <span>First Name</span>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
          </div>
          {formik.touched.firstname && formik.errors.firstname ? (
            <div style={{ color: "red" }}>{formik.errors.firstname}</div>
          ) : null}
          <br />
          <div className="col-md-12 mt-4">
            <span>Last Name</span>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div style={{ color: "red" }}>{formik.errors.lastname}</div>
            ) : null}
          </div>
          <br />
          <div className="col-md-12 mt-4">
            <span>Email</span>
            <input
              type="text"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
          <br />
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
