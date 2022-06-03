import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEmployee } from "../redux/actions/employeeActions";
import "../public/custom.css";
import Pagination from "./Pagination";

const PaginationEmployee = () => {
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

  if (isLoginLoding) {
    return <div className="loader"></div>;
  }

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div style={{ marginTop: "50px" }}>
              {employee.length > 0 ? (
                <Pagination
                  data={employee}
                  title="Pagination Employee"
                  buttonConst={3}
                  contentPerPage={5}
                  siblingCount={1}
                />
              ) : (
                <h2>No data found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationEmployee;
