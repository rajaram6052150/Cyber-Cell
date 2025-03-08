import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-social-media',
  templateUrl: './add-social-media.component.html',
  styleUrls: ['./add-social-media.component.scss']
})
export class AddSocialMediaComponent {
  myForm: FormGroup | any;
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        media_name: new FormControl('', Validators.required),
        media_designation: new FormControl('', Validators.required),
        media_subject: new FormControl('', Validators.required),
        media_email: new FormControl('', Validators.required),
        media_city: new FormControl('', Validators.required),       
      }
    );
    this.apiservice.view_social_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('media_name').setValue(res.media_name);
        this.myForm.get('media_designation').setValue(res.media_designation);
        this.myForm.get('media_subject').setValue(res.media_subject);
        this.myForm.get('media_email').setValue(res.media_email);
        this.myForm.get('media_city').setValue(res.media_city);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('media_name').value);
      data.push(this.myForm.get('media_designation').value);
      data.push(this.myForm.get('media_subject').value);
      data.push(this.myForm.get('media_email').value);
      data.push(this.myForm.get('media_city').value);
      data.push(this.id);
      this.apiservice.add_social(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['/view-social-media']);
      });
    }
  }
}
