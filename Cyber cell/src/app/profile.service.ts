import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  email:string = "";
  designation = "";
  name = "";

  setres(prof_data : {email:string,id:number,name:string,role:string,status:string}){
    this.email = prof_data.email;
    this.name = prof_data.name;
    this.designation = prof_data.role;
  }




}
