import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGN_UP_MUTATION } from '../graphql.queries/graphql.users.queries';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    username: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
      Validators.pattern("^[a-zA-Z]+$")
    ]),
    email: new FormControl<string | null>("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  })
  signupFailed: boolean = false

  constructor(private apollo: Apollo, private router: Router){}


  register(){
    if(this.signUpForm.valid){
        const { username, email, password} = this.signUpForm.value
        this.apollo.mutate<any>({
          mutation: SIGN_UP_MUTATION,
          variables: {
            username: username,
            email: email,
            password: password
          }
        }).subscribe(({data}) => {
          if(data.signup.user){
            this.router.navigate(['/login'])
          }else{
            console.log("Failed to signup")
          }
        })
      }else{
        this.markFormGroupTouched(this.signUpForm)
      }
 
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

