import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../graphql.queries/graphql.users.queries';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    password: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  })

  constructor(private apollo: Apollo, private router: Router){}

  ngOnInit(): void {
    
  }

  signIn(){
      if (this.loginForm.valid) {
        
      const { username, password } = this.loginForm.value;
      this.apollo.watchQuery<any>({
        query: LOGIN_QUERY,
        variables: {
          usernameOrEmail: username,
          password: password
        }
      }).valueChanges.subscribe((response) => {
        if(response.data.login === "Success"){
          this.router.navigate(['/home']);
        } else {
         console.log('Login Failed')         
        }      
      })
    }else{
      this.markFormGroupTouched(this.loginForm)
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
