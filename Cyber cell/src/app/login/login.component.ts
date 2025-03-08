import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import {ProfileService} from "../profile.service";
import { trigger, transition, style, animate } from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {

  showLogo:any;
  myForm: FormGroup | any;
  showPassword = false;
  constructor(private auth: ApiserviceService,private router: Router,public profile:ProfileService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.showLogo = false; // This will trigger the fade out animation
    }, 3000);




    // $("#preloder").removeAttr("style");
    // $(".loader").removeAttr("style");
    //
    // $(".loader").fadeOut();
    // $("#preloder").delay(200).fadeOut("slow");
    // $("body").removeClass("over_hid");
    this.myForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      }
    );
  }
  new_user(){
    this.router.navigate(['app-register']);
  }

  togglePasswordVisibility(inputField: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    inputField.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit(Data:any) {



    // const {username,password} = Data;
    // if (this.myForm.valid){
    //   this.profile.setUsername(Data);
    // }
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.auth.signin(
        this.myForm.get('username').value,
        this.myForm.get('password').value
      ).subscribe((res: any) => {
        //console.log(res);
        if (res.status == 'error') {
          //alert('Invalid Credentials');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Credentials!',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else if (res.status == 'ok') {
          this.auth.get_profile(res.username);

          this.auth.setSession(res);
          //this.route.navigate(['dashboard']);
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'Login Success!',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(() => {
            this.router.navigate(['dashboard']);
          })
        }
      });
    }
  }

}
