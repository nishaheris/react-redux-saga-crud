import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewEmployee } from "../../redux/actions/employeeActions";

const ViewEmployee = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const singleEmployee = useSelector((state) => state.employee.singleEmployee);

  useEffect(() => {
    dispatch(viewEmployee(id));
  }, [id]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 style={{ textAlign: "left" }}>{singleEmployee.ename}</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="content">
        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <div className="row justify-content-md-center">
                <h1>Employee Details</h1>
                <hr />
                <div className="col-4">Employee Name</div>
                <div className="col-4">{singleEmployee.ename}</div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-4">Designation</div>
                <div className="col-4">{singleEmployee.designation}</div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-4">Email</div>
                <div className="col-4">{singleEmployee.email}</div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-4">Experience</div>
                <div className="col-4">{singleEmployee.experince}</div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-4">Location</div>
                <div className="col-4">{singleEmployee.location}</div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-4">Contact Number</div>
                <div className="col-4">{singleEmployee.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
