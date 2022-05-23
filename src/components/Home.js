import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployee,
  deleteEmployee,
  deleteMultipleUser,
} from "../redux/actions/employeeActions";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import BootstrapModal from "./BootstrapModal";
import "../public/custom.css";
import { getUserProfile } from "../redux/actions/userprofileAction";

const Home = () => {
  const columns = [
    "Id",
    "Name",
    "Designation",
    "Email",
    "Experience",
    "Contact",
    "Action",
  ];
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const isLoginLoding = useSelector((state) => state.employee.loading);
  const profileData = useSelector((state) => state.userprofile.userprofile);

  const useLogdin = localStorage.getItem("userLogin");

  useEffect(() => {
    dispatch(getEmployee());
    //}
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [userIds, setUserIds] = useState("");
  const [userEmails, setUserEmails] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const multiDelete = [];

  const openModal = (empId, userEmail) => {
    setUserIds(empId);
    setUserEmails(userEmail);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(userIds));
    setShowModal(false);
    toast.success("Employee delete successfully.");
  };

  if (isLoginLoding) {
    return <div className="loader"></div>;
  }

  const handleMulipleDelete = (e) => {
    const mainData = e.data;

    mainData.forEach(function (index) {
      const ids = employee[index.index].id;
      multiDelete.push(ids);
    });
    dispatch(deleteEmployee(multiDelete));

    setTimeout(() => {
      toast.success("Employee Deleted successfully");
      dispatch(getEmployee());
    }, 500);
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div style={{ marginTop: "50px" }}>
              <BootstrapModal
                setShowModal={showModal}
                hideModal={hideModal}
                userEmail={userEmails}
                deleteEmployee={handleDelete}
              />
              <Link
                style={{ marginLeft: "88%" }}
                color="success"
                size="sm"
                to={"/employee/add"}
                className="btn btn-primary mr-2"
              >
                Add Emloyee
              </Link>

              <MUIDataTable
                className="MuiTableCell-alignCenter"
                title="Employee Data"
                onSelectionChange={(rows) => setSelectedRows(rows)}
                data={employee.map((employee, index) => {
                  return [
                    index + 1,
                    employee.ename,
                    employee.designation,
                    employee.email,
                    employee.experince,
                    employee.phone,
                    <div>
                      <Link size="sm" to={`/employee/` + employee.id}>
                        <i className="fa fa-eye"></i>
                      </Link>
                      <Link size="sm" to={`/employee/edit/` + employee.id}>
                        <i className="fa fa-pencil-alt"></i>
                      </Link>
                      <a
                        size="sm"
                        onClick={() => openModal(employee.id, employee.email)}
                      >
                        <i style={{ color: "red" }} className="fa fa-trash"></i>
                      </a>
                    </div>,
                  ];
                })}
                columns={columns}
                options={{
                  rowsPerPage: 2,
                  rowsPerPageOptions: [2, 4, 6, 8],
                  filter: false,
                  download: false,
                  print: false,
                  viewColumns: false,
                  onRowsDelete: (e) => handleMulipleDelete(e),
                }}
              ></MUIDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
