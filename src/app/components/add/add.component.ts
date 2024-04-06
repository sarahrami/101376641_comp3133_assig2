import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_EMPLOYEE_MUTATION } from '../graphql.queries/graphql.employee.queries';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  @Input() title!: string;
  
  addForm!: FormGroup

  constructor(private apollo: Apollo, private activeModal: NgbActiveModal){}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });
  }
  

  onAdd() {
    if (this.addForm.valid) {
      const empData = this.addForm.value;
      this.apollo.mutate<any>({
        mutation: ADD_EMPLOYEE_MUTATION,
        variables: {
          first_name: empData.first_name,
          last_name: empData.last_name,
          email: empData.email,
          gender: empData.gender,
          salary: empData.salary
        }
      }).subscribe(({data}) => {
        if (data.addEmployee.employee) {
          this.resetForm();
        } else {
          console.log('Failed to add employee');
        }
      });
    } else {
      this.markFormGroupTouched(this.addForm);
    }
  }

  resetForm(): void {
    this.addForm.reset({
      first_name: '',
      last_name:'',
      email: '',
      gender: '',
      salary: ''
    });
  }
  dismiss() {
    this.activeModal.dismiss();
    window.location.reload()
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    })
  }
  

}
