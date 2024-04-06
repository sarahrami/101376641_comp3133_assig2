import { gql } from 'apollo-angular';

const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
      }
      message
    }
  }
`

const LOGIN_QUERY = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password)
  }
`
export{SIGN_UP_MUTATION, LOGIN_QUERY}