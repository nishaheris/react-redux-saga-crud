import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Set URL from where get the data
const apiUrl = "http://localhost:3003/employee";

// First Step to get URL which we provide is correct or not.
function getAPi() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

//Post the data which user enter in thr field
function postAPi(employeePost) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeePost),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

//View single data API
function singleRecordAPi(id) {
  return fetch(apiUrl + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

//Delete single record of employee
function DeleteSingleRecordAPi(id) {
  return fetch(apiUrl + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

//Edit single employee record data
function editSingleRecordAPi(id, employee) {
  console.log(employee);

  return fetch(apiUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

// After getAPI create Generator function for above
function* fetchEmployee(action) {
  try {
    // yield is a built in function which allows to use generator functions sequentially
    const employee = yield call(getAPi);
    yield put({ type: "GET_EMPLOYEE_SUCCESS", employee: employee });
  } catch (e) {
    yield put({ type: "GET_EMPLOYEE_FAILED", message: e.message });
  }
}

function* addEmployee(employee) {
  try {
    // yield is a built in function which allows to use generator functions sequentially
    const empObj = employee.payload;
    const employeeOBJ = yield call(postAPi, empObj);

    yield put({ type: "CREATE_EMPLOYEE_SUCCESS", employeeOBJ });
  } catch (e) {
    yield put({ type: "CREATE_EMPLOYEE_FAILED", message: e.message });
  }
}

function* viewSingleEmployee(singleEmployee) {
  const id = singleEmployee.payload.id;
  try {
    const singleEmployee = yield call(singleRecordAPi, id);
    yield put({
      type: "GET_EMPLOYEE_SUCCESS_BY_ID",
      singleEmployee: singleEmployee,
    });
  } catch (e) {
    yield put({ type: "GET_EMPLOYEE_FAILED_BY_ID", message: e.message });
  }
}

//Delet sigle Employee data
function* deleteSingleEmployee(employee) {
  const id = employee.payload;
  try {
    yield call(DeleteSingleRecordAPi, id);

    yield put({ type: "DELETE_EMPLOYEE_SUCCESS", id: id });
  } catch (e) {
    yield put({ type: "DELETE_EMPLOYEE_FAILED", message: e.message });
  }
}

function* editSingleEmployee({ payload }) {
  const empID = payload.id.id;

  const empdata = {
    ename: payload.oldEname,
    designation: payload.oldDesignation,
    email: payload.oldEmail,
    location: payload.oldLocation,
    experince: payload.oldExperince,
    phone: payload.oldPhone,
  };

  try {
    const employee = yield call(editSingleRecordAPi, empID, empdata);

    yield put({ type: "EDIT_EMPLOYEE_SUCCESS", employee: employee });
  } catch (e) {
    yield put({ type: "EDIT_EMPLOYEE_FAILED", message: e.message });
  }
}

// call above function in saga function
function* employeeSaga() {
  //takeEvery allows multiple fetchData instances to be started concurrently
  yield takeEvery("GET_EMPLOYEE_REQUESTED", fetchEmployee);
  yield takeLatest("CREATE_EMPLOYEE_REQUESTED", addEmployee);
  yield takeLatest("DELETE_EMPLOYEE_REQUESTED", deleteSingleEmployee);
  yield takeLatest("EDIT_EMPLOYEE_REQUESTED", editSingleEmployee);
  yield takeLatest("GET_EMPLOYEE_REQUESTED_BY_ID", viewSingleEmployee);
}

export default employeeSaga;

// const viewEmployeeData = yield call(() =>
//   fetch(`http://localhost:3003/employee/${id}`).then((response) =>
//     response.json()
//   )
// );
//console.log("View employee data", viewEmployeeData);
