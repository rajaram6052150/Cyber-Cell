import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-officer',
  templateUrl: './add-officer.component.html',
  styleUrls: ['./add-officer.component.scss']
})
export class AddOfficerComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  myForm: FormGroup | any;
  prod_names: any;
  id: any;
  files: any = '';
  imagePreviewUrl: any;
  sign: any;

  ngOnInit(): void {
    // this.apiservice.view_names().subscribe((res) => {
    //   this.prod_names = res;
    // });
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        sname: new FormControl('', Validators.required),
        designation: new FormControl('', Validators.required),
        srole: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required),
        sign: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_staff_id(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.myForm.get('sname').setValue(res.sname);
        this.myForm.get('designation').setValue(res.designation);
        this.myForm.get('srole').setValue(res.srole);
        this.myForm.get('contact').setValue(res.contact);
        if (res.sign != null) {
          this.imagePreviewUrl = "http://44.211.166.253/api/ccp/sign_uploads/" + res.sign
        }
      }
    });
  }
  readThis(e: any) {
    this.files = e.target.files[0];
    if (this.files) {
      this.previewImage(this.files);
    }
  }
  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('sname').value);
      data.push(this.myForm.get('designation').value);
      data.push(this.myForm.get('srole').value);
      data.push(this.myForm.get('contact').value);
      data.push(this.id);
      this.apiservice.add_staff(data, this.files).subscribe((res: any) => {
        Swal.fire({
          title: 'Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['/view-officer']);
      });
    }
  }
}