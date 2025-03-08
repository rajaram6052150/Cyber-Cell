import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private apiservice: ApiserviceService, private router: Router) { }
  username:any;
  ngOnInit(): void {
    // this.apiservice.checking().subscribe((res: any) => {
    //   if (res.status == 'error') {
    //     this.router.navigate(['login']);
    //   }
    //   if (res.status == 'ok') {
    //     this.username;
    //     console.log('hiii');
    //     console.log(this.username);
    //     console.log('hh');
    //   }
    // })
  }
  ngAfterViewInit() {
    document.querySelector('.mobile-toggle-menu')!.addEventListener('click', () => {
      document.querySelector('.wrapper')!.classList.add('toggled')
    });
    document.querySelector('.toggle-icon')!.addEventListener('click', () => {
      document.querySelector('.wrapper')!.classList.contains('toggled') ?
        document.querySelector('.wrapper')!.classList.remove('toggled') :
        document.querySelector('.wrapper')!.classList.add('toggled');
    });
  }
  logout() {
    this.apiservice.logout();
    this.router.navigate(['login']);
  }
  profile(){
    this.router.navigate(['profile']);
  }


}
