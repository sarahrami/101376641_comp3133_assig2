import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { DELETE_EMPLOYEE_MUTATION } from '../graphql.queries/graphql.employee.queries';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [HeaderComponent, DeleteComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  
  @Input() title!: string;
  @Input() message!: string;
  @Input() employeeId!: string

  constructor(private activeModal: NgbActiveModal, private apollo: Apollo) { }

  ngOnInit() {
  }

   decline() {
    this.activeModal.close(false);
  }

   accept() {
    this.apollo.mutate<any>({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: {
        id: this.employeeId
      }
    }).subscribe((response) => {
      if(response.data.deleteEmployeeById){
         this.activeModal.close(true);
      }else{
        alert("Failed to delete employee! ")
      }
    })
   
  }

   dismiss() {
    this.activeModal.dismiss();
  }
 

}
