# 101376641Comp3133Assig2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

### This Project is an employee management system that allows :
  - Adding Employee
  - Updating Employee
  - Viewing Employee
  - Deleting Employee
  - Registering
  - Signing in
#### Nine components
  - graphql - Holds queries and mutations for user and employee.
  - Header - Display application header with logout button that navigates to login page.
  - Home - Displays employee data from graphql (first_name, last_name, email) from the mongodb + actions(view, update, delete).
  - View - Displays all employee data in a modal (first_name, last_name, email, gender, salary)
  - Update - Displays all employee data in a modal and allow updating (first_name, last_name, email, gender, salary)
  - Delete - Display a confrimation message in a modal.
  - Login - Displays a login form from bootstrap.
  - Signup - Displays a login form from bootstrap.
#### One service
  - Handles modals for (view, delete, update, add)
#### One interface:
  - Holds Employee Information
#### Styling:
  - Tailwind
  - Css
  - Bootstrap

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
