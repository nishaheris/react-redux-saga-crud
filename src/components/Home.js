import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, deleteEmployee } from "../redux/actions/employeeActions";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  const columns = [
    "Id",
    "Employee Name",
    "Employee Designation",
    "Email",
    "Experience",
    "Location",
    "Contact",
    "Action",
  ];
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const useLogdin = localStorage.getItem("userLogin");

  useEffect(() => {
    if (useLogdin) {
      dispatch(getEmployee());
    }
  }, [useLogdin]);

  const handleDelete = (id) => {
    if (window.confirm("Asre you sure you want to delete the record ?")) {
      dispatch(deleteEmployee(id));
      toast.success("Employee delete successfully.");
    }
  };

  return (
    <>
      <Navbar />
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
            employee.location,
            employee.phone,
            <div>
              <Link
                color="success"
                size="sm"
                to={`/employee/` + employee.id}
                className="btn btn-primary mr-2"
              >
                View
              </Link>
              <Link
                color="success"
                size="sm"
                to={`/employee/edit/` + employee.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <Button
                color="success"
                size="sm"
                onClick={() => handleDelete(employee.id)}
                className="btn btn-danger"
              >
                Delete
              </Button>
            </div>,
          ];
        })}
        columns={columns}
        options={{
          filter: false,
          download: false,
          print: false,
          viewColumns: false,
          selectableRows: false, // <===== will turn off checkboxes in rows
        }}
      ></MUIDataTable>
    </>
  );
};

export default Home;
