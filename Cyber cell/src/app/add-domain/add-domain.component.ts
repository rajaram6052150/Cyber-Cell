import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent {
  myForm: FormGroup | any;
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        domain_name: new FormControl('', Validators.required),
        site_info: new FormControl('', Validators.required),
        domain_designation: new FormControl('', Validators.required),
        domain_email: new FormControl('', Validators.required),
        domain_city: new FormControl('', Validators.required),       
      }
    );
    this.apiservice.view_domain_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('domain_name').setValue(res.domain_name);
        this.myForm.get('site_info').setValue(res.site_info);
        this.myForm.get('domain_designation').setValue(res.domain_designation);
        this.myForm.get('domain_email').setValue(res.domain_email);
        this.myForm.get('domain_city').setValue(res.domain_city);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('domain_name').value);
      data.push(this.myForm.get('site_info').value);
      data.push(this.myForm.get('domain_designation').value);
      data.push(this.myForm.get('domain_email').value);
      data.push(this.myForm.get('domain_city').value);
      data.push(this.id);
      this.apiservice.add_domain(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['/view-domain']);
      });
    }
  }
}
