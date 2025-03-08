import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ProfileService} from "../profile.service";
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  id:any;
  // show = false;
  // show1=false;
  admin:any;
  eo:any;
  assistant:any;

  constructor(private auth: ApiserviceService ,private router:Router,public profile:ProfileService) { }
  counts:any;
  vals:any;
  ngOnInit(): void {


  this.auth.verify().subscribe((res: any) => {
    console.log(res);
    if (res.status == 'ok'){
      this.profile.setres(res);
    }
    if (res.status == 'ok' && res.role == 'admin') {

      this.admin=true;
      this.eo=false;
      this.assistant=false;
      return true;
    }
    else if (res.status == 'ok' && res.role == 'eo') {
      console.log(res);
      this.eo=true;
      this.admin=false;
      this.assistant=false;
      return true;
    }
    else if (res.status == 'ok' && res.role == 'assistant') {
      console.log(res);
      this.assistant=true;
      this.admin=false;
      this.eo=false;
      return true;
    }


    else {
      // this.router.navigate(['/login']);
      this.admin=false;
      this.eo=false;
      this.assistant=false;
      return false;
    }
  })
}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
