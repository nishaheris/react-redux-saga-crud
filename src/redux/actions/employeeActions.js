import * as type from "../types";

export function getEmployee(employee) {
  return {
    type: type.GET_EMPLOYEE_REQUESTED,
    payload: employee,
  };
}

export function addEmployee(employee) {
  return {
    type: type.CREATE_EMPLOYEE_REQUESTED,
    payload: employee,
  };
}

export function viewEmployee(id) {
  return {
    type: type.GET_EMPLOYEE_REQUESTED_BY_ID,
    payload: id,
  };
}

export function deleteEmployee(id) {
  return {
    type: type.DELETE_EMPLOYEE_REQUESTED,
    payload: id,
  };
}

export function editEmployee(employee) {
  return {
    type: type.EDIT_EMPLOYEE_REQUESTED,
    payload: employee,
  };
}
