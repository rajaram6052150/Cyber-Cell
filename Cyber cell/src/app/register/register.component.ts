import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup | any;
  constructor(private auth: ApiserviceService, private route: Router) { }

  ngOnInit(): void {
        this.myForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        // role: new FormControl('', Validators.required),        
      }
    );
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.auth.signup(
        this.myForm.get('name').value,
        this.myForm.get('email').value,
        this.myForm.get('username').value,
        this.myForm.get('password').value
      ).subscribe((res: any) => {
        console.log(res);
        if (res.status == 'error') {
          //alert('Username already Taken!');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username already Taken!',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else if (res.status == 'ok') {
          this.auth.setSession(res);
          //this.route.navigate(['dashboard']);
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'Registeration Success!',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(() => {
            this.route.navigate(['dashboard']);
          })
        }
      });
    }
  }
}