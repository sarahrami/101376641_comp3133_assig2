import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {GET_EMPLOYEES_QUERY} from '../graphql.queries/graphql.employee.queries'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterModule } from '@angular/router';
import { DeleteComponent } from '../delete/delete.component';
import { ModalServices } from '../../services/modal.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle, HeaderComponent, 
    RouterLink, DeleteComponent, NgIf, NgFor, NgTemplateOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  employees: any[] = [];
  faTrashAlt = faTrashAlt
  faPencil = faPencil
  faEye = faEye
  faPlus = faPlus

  constructor(private apollo: Apollo, private modalService: ModalServices){}

  ngOnInit(): void {
    this.fetchAllEmp()
    
  }
  

  fetchAllEmp(): void {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES_QUERY
    }).valueChanges.subscribe((response) => {
      if (response.data && response.data.getAllEmployees) {
        this.employees = response.data.getAllEmployees;
        console.log(this.employees);
      } else {
        console.error('No data found in response.');
      }
    });
  }

  onDelete(employeeId: string){
    this.modalService.confirm('Confirmation', 'Are you sure you want to delete this employee ?', employeeId)
    .then(() => {
      window.location.reload()
    }).catch(error => {
      console.log(error)
    })

  }

  onView(employeeId: string) {
    this.modalService.view('Employee Information', employeeId )
  }
  onUpdate(employeeId: string){
    this.modalService.update('Update Employee', employeeId)
  }
  onAdd(){
    this.modalService.add('Add Employee')
  }

}
