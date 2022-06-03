import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getEmployee,
  deleteEmployee,
  viewEmployee,
  editEmployee,
} from "../redux/actions/employeeActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../public/custom.css";
import DeleteEmployeeModal from "../components/employee/DeleteEmployeeModal";
import EditEmployeeModal from "./employee/EditEmployeeModal";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);

  const isLoginLoding = useSelector((state) => state.employee.loading);

  useEffect(() => {
    dispatch(getEmployee());
  }, []);

  const [employeeData, setEmployeeData] = useState({
    ename: "",
    designation: "",
    email: "",
    location: "",
    experince: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userIds, setUserIds] = useState("");
  const [userEmails, setUserEmails] = useState("");
  const multiDelete = [];
  const singleEmployee = useSelector((state) => state.employee.singleEmployee);
  const [errorMsg, setErroeMsg] = useState();
  const [inValidEmail, setInValidEmail] = useState();

  const openModal = (empId, userEmail) => {
    setUserIds(empId);
    setUserEmails(userEmail);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setShowEditModal(true);
    dispatch(viewEmployee(item.id));
    setUserIds(item.id);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const hideModalEdit = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    setEmployeeData({ ...singleEmployee });
  }, [singleEmployee]);

  const handleDelete = () => {
    dispatch(deleteEmployee(userIds));
    setShowModal(false);
    toast.success("Employee delete successfully.");
    dispatch(getEmployee());
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

  const validateForm = (e) => {
    let errorMsg = {};

    if (e.target.name === "ename") {
      let errorEname = e.target.value;
      if (errorEname === "") {
        errorMsg.ename = "Please enter name";
      }
    }

    if (e.target.name === "designation") {
      let errorDesignation = e.target.value;
      if (errorDesignation === "") {
        errorMsg.designation = "Please enter Designation";
      }
    }

    if (e.target.name === "email") {
      let errorEmail = e.target.value;
      if (errorEmail === "") {
        errorMsg.email = "Please enter Email";
      } else if (validEmail(errorEmail)) {
        errorMsg.email = inValidEmail;
      }
    }

    if (e.target.name === "location") {
      let errorLocation = e.target.value;
      if (errorLocation === "") {
        errorMsg.location = "Please enter Location";
      }
    }

    if (e.target.name === "experince") {
      let errorExperince = e.target.value;
      if (errorExperince === "") {
        errorMsg.experince = "Please enter Experince";
      }
    }

    if (e.target.name === "phone") {
      let errorPhone = e.target.value;
      if (errorPhone === "") {
        errorMsg.phone = "Please enter Phone";
      }
    }

    return setErroeMsg(errorMsg);
  };

  function validEmail(email) {
    let msg = "Please enter valid email";
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexp.test(email) === false) {
      setInValidEmail(msg);
    } else {
      setInValidEmail("");
    }
    return inValidEmail;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editEmployee({
        employeeData,
      })
    );
    setShowEditModal(false);
    toast.success("Employee Edit successfully");
    dispatch(getEmployee());
    setTimeout(() => navigate("/dashboard"), 500);
  };

  const inputChnage = (e) => {
    let { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    validateForm(e);
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div style={{ marginTop: "50px" }}>
              <DeleteEmployeeModal
                setShowModal={showModal}
                hideModal={hideModal}
                userEmail={userEmails}
                deleteEmployee={handleDelete}
              />

              <EditEmployeeModal
                setShowEditModal={showEditModal}
                hideModalEdit={hideModalEdit}
                onSubmit={onSubmit}
                inputChnage={inputChnage}
                employeeData={employeeData}
                errorMsg={errorMsg}
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
                      {/* <Link size="sm" to={`/employee/edit/` + employee.id}>
                        <i className="fa fa-pencil-alt"></i>
                      </Link> */}
                      <a size="sm" onClick={() => openEditModal(employee)}>
                        <i
                          style={{ color: "#007bff" }}
                          className="fa fa-pencil-alt"
                        ></i>
                      </a>
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
                  rowsPerPage: 5,
                  rowsPerPageOptions: [5, 10],
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
