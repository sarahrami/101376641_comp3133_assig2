import { Component, Input, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SEARCH_EMPLOYEE_QUERY } from '../graphql.queries/graphql.employee.queries';
import {Employee} from '../../models/employee.model'
import { HeaderComponent } from '../header/header.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
  
})
export class ViewComponent implements OnInit{

  employee: Employee | null = null ;
  @Input() title!: string
  @Input() employeeId!: string

  constructor(private apollo: Apollo,  private activeModal: NgbActiveModal){}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: SEARCH_EMPLOYEE_QUERY,
      variables: {
        id: this.employeeId
      }
    }).valueChanges.subscribe((response) => {
      console.log(response);
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.employee = response.data.searchEmployeeById.employee;
        console.log(this.employee);
      }
    });
  }

 
  dismiss() {
    this.activeModal.dismiss();
  }
}
