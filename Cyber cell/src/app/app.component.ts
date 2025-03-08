import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jewellery';
  constructor(private location: Location) { }
  ngOnInit(): void {
    const currentURL = this.location.path();
    const hasValue = currentURL.includes('csr-report/');
    if (hasValue) {
      console.log('The URL contains "SBI"');
      document.querySelector('body')!.classList.remove("bg-theme1")
      document.querySelector('body')!.classList.add("bg-body")
    } else {
      console.log('The URL does not contain "SBI"');
    }
  }
}
