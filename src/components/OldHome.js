import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, deleteEmployee } from "../redux/actions/employeeActions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
  const error = useSelector((state) => state.employee.error);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    dispatch(getEmployee());
    setSearchApiData(getEmployee());
  }, []);

  const handleFilter = (e) => {
    setFilterVal(e.target.value);
    const FilterRsult = searchApiData.filter((employee) =>
      employee.ename.toLowerCase().includes(e.target.value.toLowerCase())
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Asre you sure you want to delete the record ?")) {
      dispatch(deleteEmployee(id));
      toast.success("Employee delete successfully.");
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="py-4">
          <h1>Home Page</h1>

          <input
            type="text"
            name="search"
            value={filterVal}
            onChange={(e) => handleFilter(e)}
          />
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Email</th>
                <th scope="col">Experience</th>
                <th scope="col">Location</th>
                <th scope="col">Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.length > 0 &&
                employee.map((employee, index) => (
                  <tr key={employee.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{employee.ename}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.email}</td>
                    <td>{employee.experince}</td>
                    <td>{employee.location}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <Link
                        to={`/employee/${employee.id}`}
                        className="btn btn-primary mr-2"
                      >
                        view
                      </Link>{" "}
                      &nbsp;
                      <Link
                        to={`/employee/edit/${employee.id}`}
                        className="btn btn-outline-primary"
                      >
                        Edit
                      </Link>{" "}
                      &nbsp;
                      <Link
                        to="#"
                        className="btn btn-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              {employee.length === 0 && <p>No Employee Avilable!</p>}
              {error && <p>{error}</p>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
