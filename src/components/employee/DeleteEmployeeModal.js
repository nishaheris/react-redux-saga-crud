import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteEmployeeModal = ({
  setShowModal,
  hideModal,
  userEmail,
  deleteEmployee,
}) => {
  return (
    <Modal
      show={setShowModal}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delte this {userEmail} ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteEmployee}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;
