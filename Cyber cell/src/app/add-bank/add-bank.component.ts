import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {
  myForm: FormGroup | any;
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        bank_name: new FormControl('', Validators.required),
        bank_officer_name: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        bank_branch_name: new FormControl('', Validators.required),
        bank_ifsc: new FormControl('', Validators.required),
        bank_subject: new FormControl('', Validators.required),
        bank_email: new FormControl('', Validators.required),
        bank_city: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_bank_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('bank_name').setValue(res.bank_name);
        this.myForm.get('bank_officer_name').setValue(res.bank_officer_name);
        this.myForm.get('designation').setValue(res.designation);
        this.myForm.get('bank_branch_name').setValue(res.bank_branch_name);
        this.myForm.get('bank_ifsc').setValue(res.bank_ifsc);
        this.myForm.get('bank_subject').setValue(res.bank_subject);
        this.myForm.get('bank_email').setValue(res.bank_email);
        this.myForm.get('bank_city').setValue(res.bank_city);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('bank_name').value);
      data.push(this.myForm.get('bank_officer_name').value);
      data.push(this.myForm.get('designation').value);
      data.push(this.myForm.get('bank_branch_name').value);
      data.push(this.myForm.get('bank_ifsc').value);
      data.push(this.myForm.get('bank_subject').value);
      data.push(this.myForm.get('bank_email').value);
      data.push(this.myForm.get('bank_city').value);
      data.push(this.id);
      this.apiservice.add_bank(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Advance Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['/view-bank']);
      });
    }
  }
}
