import { gql } from 'apollo-angular';

const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: Gender!, $salary: Float!) {
    addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
      employee {
        _id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  }
`;

const GET_EMPLOYEES_QUERY = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: ID!, $first_name: String, $last_name: String, $email: String, $gender: Gender, $salary: Float) {
    updateEmployeeById(id: $id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
      employee {
        _id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  }
`;

const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployeeById(id: $id)
  }
`;

const SEARCH_EMPLOYEE_QUERY = gql`
  query SearchEmployee($id: ID!) {
    searchEmployeeById(id: $id) {
      employee {
        _id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  }
`;

export { ADD_EMPLOYEE_MUTATION, GET_EMPLOYEES_QUERY, UPDATE_EMPLOYEE_MUTATION, DELETE_EMPLOYEE_MUTATION, SEARCH_EMPLOYEE_QUERY };
