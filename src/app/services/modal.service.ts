import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddComponent } from "../components/add/add.component";
import { DeleteComponent } from "../components/delete/delete.component";
import { ViewComponent } from "../components/view/view.component";
import { UpdateComponent } from "../components/update/update.component";


@Injectable({
  providedIn: 'root'
})
export class ModalServices{
    constructor(private modalService: NgbModal){}

    add(title: string){
       const modalRef = this.modalService.open(AddComponent)
       modalRef.componentInstance.title = title;
       return modalRef.result
    }

    confirm(title: string, message: string, employeeId: string): Promise<boolean> {
        const modalRef = this.modalService.open(DeleteComponent);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.employeeId = employeeId
    
        return modalRef.result;
    }

    view(title: string, employeeId:string){
      const modalRef = this.modalService.open(ViewComponent)
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.employeeId = employeeId

      return modalRef.result
   }

   update(title: string, employeeId:string){
    const modalRef = this.modalService.open(UpdateComponent)
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.employeeId = employeeId
    return modalRef.result
 }
}