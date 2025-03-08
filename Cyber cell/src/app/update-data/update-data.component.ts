import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent {

  ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  category: any; sub_category: any; c_status: any; incident_date: any;
  complaint_date: any; last_action_date: any;
  complainant_name: any; complainant_mobile: any;
  complainant_email: any; complainant_address: any;
  suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any;
  transaction_id: any; transaction_amount: any; officers: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  office_names: any;
  flocations: any = [];
  tlocations: any = [];
  locations1: any = [];
  id: any;
  title = 'csvupload';
  form: FormGroup;
  message: any;

  constructor(private fb: FormBuilder, private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      excel: [null]
    })
  }
  ngOnInit(): void {
    this.apiservice.view_staff().subscribe((res) => {
      this.prod_names = res;
      console.log(this.prod_names);

    });
    // this.apiservice.view_offices().subscribe((res) => {
    //   this.office_names = res;
    // });
    // this.apiservice.view_city().subscribe((res) => {
    //   this.locations1 = res;
    // });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.myForm = new FormGroup(
      {
        ack_no: new FormControl('', Validators.required),
        state_name: new FormControl(''),
        district_name: new FormControl(''),
        station_name: new FormControl(''),
        crime_info: new FormControl(''),
        category: new FormControl(''),
        sub_category: new FormControl(''),
        c_status: new FormControl(''),
        incident_date: new FormControl(''),
        complaint_date: new FormControl(''),
        last_action_date: new FormControl(''),
        complainant_name: new FormControl(''),
        complainant_mobile: new FormControl(''),
        complainant_email: new FormControl(''),
        complainant_address: new FormControl(''),
        suspect_name: new FormControl(''),
        suspect_mobile: new FormControl(''),
        suspect_id_no: new FormControl(''),
        amount: new FormControl(''),
        // transaction_type: new FormControl(''),
        // ac_bank_name: new FormControl(''),
        // ac_no: new FormControl(''),
        // ifsc_code: new FormControl(''),
        // transaction_id: new FormControl(''),
        // transaction_amount: new FormControl(''),
        officers: new FormControl(''),
      }
    );
    this.apiservice.view_ccp_details_id(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.myForm.get('ack_no').setValue(res.ack_no);
        this.myForm.get('state_name').setValue(res.state_name);
        this.myForm.get('district_name').setValue(res.district_name);
        this.myForm.get('station_name').setValue(res.station_name);
        this.myForm.get('crime_info').setValue(res.crime_info);
        this.myForm.get('category').setValue(res.category);
        this.myForm.get('sub_category').setValue(res.sub_category);
        this.myForm.get('c_status').setValue(res.c_status);
        this.myForm.get('incident_date').setValue(res.incident_date);
        this.myForm.get('complaint_date').setValue(res.complaint_date);
        this.myForm.get('last_action_date').setValue(res.last_action_date);
        this.myForm.get('complainant_name').setValue(res.complainant_name);
        this.myForm.get('complainant_mobile').setValue(res.complainant_mobile);
        this.myForm.get('complainant_email').setValue(res.complainant_email);
        this.myForm.get('complainant_address').setValue(res.complainant_address);
        this.myForm.get('suspect_name').setValue(res.suspect_name);
        this.myForm.get('suspect_mobile').setValue(res.suspect_mobile);
        this.myForm.get('suspect_id_no').setValue(res.suspect_id_no);
        this.myForm.get('amount').setValue(res.amount);
        // this.myForm.get('transaction_type').setValue(res.transaction_type);
        // this.myForm.get('ac_bank_name').setValue(res.ac_bank_name);
        // this.myForm.get('ac_no').setValue(res.ac_no);
        // this.myForm.get('ifsc_code').setValue(res.ifsc);
        // this.myForm.get('transaction_id').setValue(res.transaction_id);
        // this.myForm.get('transaction_amount').setValue(res.transaction_amount);
        this.myForm.get('officers').setValue(res.officers);
      }
    })
  }
  // balance_amt() {
  //   this.myForm.get('balance').setValue(this.myForm.get('freight').value - this.myForm.get('advance_amt').value);
  // }
  // autofill(e: any) {
  //   this.myForm.get('from').setValue(e.target.innerHTML);
  //   this.flocations = [];
  // }
  // searching(e: any) {
  //   this.flocations = this.locations1.filter((d: any) => {
  //     return d.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  // }
  // autofill1(e: any) {
  //   this.myForm.get('to').setValue(e.target.innerHTML);
  //   this.tlocations = [];
  // }
  // searching1(e: any) {
  //   this.tlocations = this.locations1.filter((d: any) => {
  //     return d.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   });
  // }
  onSubmit() {
    this.myForm.markAllAsTouched();
    // console.log('Advance Date', this.myForm.get('advance_date').value);
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('ack_no').value);
      data.push(this.myForm.get('state_name').value);
      data.push(this.myForm.get('district_name').value);
      data.push(this.myForm.get('station_name').value);
      data.push(this.myForm.get('crime_info').value);
      data.push(this.myForm.get('category').value);
      data.push(this.myForm.get('sub_category').value);
      data.push(this.myForm.get('c_status').value);
      data.push(this.myForm.get('incident_date').value);
      data.push(this.myForm.get('complaint_date').value);
      data.push(this.myForm.get('last_action_date').value);
      data.push(this.myForm.get('complainant_name').value);
      data.push(this.myForm.get('complainant_mobile').value);
      data.push(this.myForm.get('complainant_email').value);
      data.push(this.myForm.get('complainant_address').value);
      data.push(this.myForm.get('suspect_name').value);
      data.push(this.myForm.get('suspect_mobile').value);
      data.push(this.myForm.get('suspect_id_no').value);
      data.push(this.myForm.get('amount').value);
      data.push(this.myForm.get('transaction_type').value);
      data.push(this.myForm.get('ac_bank_name').value);
      data.push(this.myForm.get('ac_no').value);
      data.push(this.myForm.get('ifsc').value);
      data.push(this.myForm.get('transaction_id').value);
      data.push(this.myForm.get('transaction_amount').value);
      data.push(this.myForm.get('officers').value);
      data.push(this.id);
      this.apiservice.add_products(data).subscribe((res: any) => {

        Swal.fire({
          title: 'Request Sent to Concern Person',
          icon: 'success',
        })
        // location.href = "https://mail.google.com/mail/u/0/#inbox?compose=new"
        location.href = "/waiting-approval"
      });
    }
  }

  
}