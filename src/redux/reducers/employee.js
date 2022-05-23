import * as type from "../types";

const initialState = {
  employee: [],
  singleEmployee: [],
  loading: false,
  error: null,
};

function employee(state = initialState, action) {
  switch (action.type) {
    case type.GET_EMPLOYEE_REQUESTED:
    case type.CREATE_EMPLOYEE_REQUESTED:
    case type.GET_EMPLOYEE_REQUESTED_BY_ID:
    case type.EDIT_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case type.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.employee,
      };

    case type.CREATE_EMPLOYEE_SUCCESS:
    case type.EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case type.DELETE_EMPLOYEE_REQUESTED:
      return {
        ...state,
        loading: false,
      };
    case type.GET_EMPLOYEE_SUCCESS_BY_ID:
      return {
        ...state,
        loading: false,
        singleEmployee: action.singleEmployee,
      };
    case type.DELETE_EMPLOYEE_SUCCESS:
      const temp = {
        ...state,
        loading: false,
        employee: state.employee.filter((item) => item.id !== action.id),
      };

      //debugger;
      return temp;
    case type.GET_EMPLOYEE_FAILED:
    case type.CREATE_EMPLOYEE_FAILED:
    case type.GET_EMPLOYEE_FAILED_BY_ID:
    case type.DELETE_EMPLOYEE_FAILED:
    case type.EDIT_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}

export default employee;
