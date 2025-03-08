import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss']
})
export class AddMerchantComponent {
  myForm: FormGroup | any;
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        merchant_name: new FormControl('', Validators.required),
        merchant_designation: new FormControl('', Validators.required),
        merchant_subject: new FormControl('', Validators.required),
        merchant_email: new FormControl('', Validators.required),
        merchant_city: new FormControl('', Validators.required),       
      }
    );
    this.apiservice.view_bank_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('merchant_name').setValue(res.merchant_name);
        this.myForm.get('merchant_designation').setValue(res.merchant_designation);
        this.myForm.get('merchant_subject').setValue(res.merchant_subject);
        this.myForm.get('merchant_email').setValue(res.merchant_email);
        this.myForm.get('merchant_city').setValue(res.merchant_city);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('merchant_name').value);
      data.push(this.myForm.get('merchant_designation').value);
      data.push(this.myForm.get('merchant_subject').value);
      data.push(this.myForm.get('merchant_email').value);
      data.push(this.myForm.get('merchant_city').value);
      data.push(this.id);
      this.apiservice.add_merchant(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['/view-merchant']);
      });
    }
  }
}