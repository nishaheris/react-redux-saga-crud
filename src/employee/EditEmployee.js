import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../redux/actions/employeeActions";
import { viewEmployee } from "../redux/actions/employeeActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => {
    // Calling toast method by passing string
    setTimeout(() => {
      toast.success("Employee Edit successfully");
    }, 1000);
  };
  const id = useParams();

  const [ename, setEname] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [experince, setExperince] = useState("");
  const [phone, setPhone] = useState("");

  // const [employee, setEmployee] = useState({
  //   ename: "",
  //   designation: "",
  //   email: "",
  //   location: "",
  //   experince: "",
  //   phone: "",
  // });

  const singleEmployee = useSelector((state) => state.employee.singleEmployee);

  useEffect(() => {
    if (id) {
      dispatch(viewEmployee(id));
    }
  }, [id]);

  const inputChnage = (e) => {
    // setEmployee({
    //   ...singleEmployee,
    //   [e.target.name]: e.target.value,
    // });
    // console.log("Input Change Record", singleEmployee);
  };

  // const { ename, designation, email, location, experince, phone } =
  //   singleEmployee;

  const onSubmit = (e) => {
    e.preventDefault();

    //if (ename || designation) {
    var oldEname = ename == "" ? singleEmployee.ename : ename;
    var oldDesignation =
      designation == "" ? singleEmployee.designation : designation;

    var oldEmail = email == "" ? singleEmployee.email : email;
    var oldLocation = location == "" ? singleEmployee.location : location;
    var oldExperince = experince == "" ? singleEmployee.experince : experince;
    var oldPhone = phone == "" ? singleEmployee.phone : phone;

    dispatch(
      editEmployee({
        id,
        oldEname,
        oldDesignation,
        oldEmail,
        oldLocation,
        oldExperince,
        oldPhone,
      })
    );
    setTimeout(() => navigate("/dashboard"), 500);
    // if (ename == "" && designation == "") {
    //   let oldEname = singleEmployee.ename;
    //   let oldDesignation = singleEmployee.designation;
    //   dispatch(editEmployee({ id, oldEname, oldDesignation }));
    // } else {
    //   console.log(ename);
    //   dispatch(editEmployee({ id, ename, designation }));
    // }
    //setTimeout(() => navigate("/"), 500);
    //}
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit Employee</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="ename"
                placeholder="Employee name"
                onChange={(e) => setEname(e.target.value)}
                defaultValue={singleEmployee.ename}
              />
            </div>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="designation"
                placeholder="Employee designation"
                onChange={(e) => setDesignation(e.target.value)}
                defaultValue={singleEmployee.designation}
              />
            </div>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="email"
                placeholder="Employee email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={singleEmployee.email}
              />
            </div>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="location"
                placeholder="Employee location"
                onChange={(e) => setLocation(e.target.value)}
                defaultValue={singleEmployee.location}
              />
            </div>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="experince"
                placeholder="Employee experince"
                onChange={(e) => setExperince(e.target.value)}
                defaultValue={singleEmployee.experince}
              />
            </div>
            <div className="form-group">
              <input
                //value={ename}
                className="form-control form-control-lg"
                type="text"
                name="phone"
                placeholder="Employee phone"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={singleEmployee.phone}
              />
            </div>

            <button className="btn btn-primary btn-block" onClick={notify}>
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
