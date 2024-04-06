import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo, Mutation } from 'apollo-angular';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SEARCH_EMPLOYEE_QUERY, UPDATE_EMPLOYEE_MUTATION } from '../graphql.queries/graphql.employee.queries';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  @Input() title!: string;
  @Input() employee!: any;
  @Input() employeeId!: string;

  updateForm!: FormGroup

  constructor(private apollo: Apollo, private activeModal: NgbActiveModal){}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });
    this.fetchEmployeeInfo()
  }

  onUpdate(){
    const updatedData = this.updateForm.value;
    this.apollo.mutate<any>({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: {
        id: this.employeeId,
        first_name: updatedData.first_name,
        last_name: updatedData.last_name,
        email: updatedData.email,
        gender: updatedData.gender,
        salary: updatedData.salary
      }
    }).subscribe(({data}) => {
      if (data.updateEmployeeById.employee) {
        this.dismiss()
      }else{
        alert('Failed to update employee')
      }
    })
    
  }

  fetchEmployeeInfo(): void {
    this.apollo.watchQuery<any>({
      query: SEARCH_EMPLOYEE_QUERY,
      variables: {
        id: this.employeeId
      }
    }).valueChanges.subscribe((response) => {
      if (response.data && response.data.searchEmployeeById) {
        this.employee = response.data.searchEmployeeById.employee;
        this.updateForm.patchValue(this.employee);
        console.log(this.employee)
      } else {
        console.log('No data found for employee.');
      }
    });
  }
  

  dismiss() {
    this.activeModal.dismiss();

  }

}
