import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit{


  ack_no: any; state_name: any;
  district_name: any; station_name: any;
  crime_info: any;
  category: any;
  sub_category: any; c_status: any; incident_date: any;
  complaint_date: any; last_action_date: any;
  complainant_name: any; complainant_mobile: any;
  complainant_email: any; complainant_address: any;
  suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any;
  transaction_id: any; transaction_amount: any; officers: any;payment_id:any;subject_id:any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  office_names: any;
  bank_name: any;
  type_name: any;
  list_name: any;
  flocations: any = [];
  tlocations: any = [];
  locations1: any = [];
  id: any;
  title = 'csvupload';
  form: FormGroup;
  message: any;
  sub_name: any = [];
  pay_type: any;
  subject_desc: any;
  sub_drop: any;

  constructor(private fb: FormBuilder, private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      excel: [null]
    });
  }
  ngOnInit(): void {
    this.apiservice.view_staff().subscribe((res) => {
      this.prod_names = res;
    });
    this.apiservice.view_type().subscribe((res) => {
      this.type_name = res;
    });
    // this.apiservice.view_all_subjects().subscribe((res) => {
    //   this.sub_name = res;
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
        transaction_type: new FormControl(''),
        ac_bank_name: new FormControl(''),
        ac_no: new FormControl(''),
        ifsc_code: new FormControl(''),
        transaction_id: new FormControl(''),
        transaction_amount: new FormControl(''),
        officers: new FormControl(''),
        subject_desc: new FormControl(''),
        pay_type: new FormControl(''),
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
        this.myForm.get('transaction_type').setValue(res.transaction_type);
        this.myForm.get('ac_bank_name').setValue(res.ac_bank_name);
        this.myForm.get('ac_no').setValue(res.ac_no);
        this.myForm.get('ifsc_code').setValue(res.ifsc);
        this.myForm.get('transaction_id').setValue(res.transaction_id);
        this.myForm.get('transaction_amount').setValue(res.transaction_amount);
        this.myForm.get('officers').setValue(res.officers);
        this.myForm.get('pay_type').setValue(res.pay_type);
        if(res.pay_type != ''){
          this.sub_drop = this.sub_name.filter((item: any) => item.subject_id == res.pay_type);
        }
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    // console.log('Advance Date', this.myForm.get('advance_date').value);
    if (this.myForm.valid) {
      // const data = this.myForm.value;
      // data.id = this.id;
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
      data.push(this.myForm.get('ifsc_code').value);
      data.push(this.myForm.get('transaction_id').value);
      data.push(this.myForm.get('transaction_amount').value);
      data.push(this.myForm.get('officers').value);
      data.push(this.myForm.get(this.id));
      data.push(this.myForm.get('officers').value)
      data.push(this.myForm.get('pay_type').value)
      // data.push(this.myForm.get('subject_desc').value)
      this.apiservice.add_products(data).subscribe((res: any) => {
        console.log("bgbgd")

        Swal.fire({
          title: 'Request Sent to Concern Person',
          icon: 'success',
        })
        // location.href = "https://mail.google.com/mail/u/0/#inbox?compose=new"
        location.href = "/waiting-approval"


        // if (this.myForm.get('transaction_type').value == '' && this.myForm.get('officers').value == '') {
        //   this.router.navigate(['/csr-report'])
        // }
        // else if (this.myForm.get('payment_date').value == '') {
        //   this.router.navigate(['payment-pending'])
        // }
        // else {
        //   this.router.navigate(['consolidated'])
        // }
      });
    }
  }

  onPaymentTypeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.sub_drop = this.sub_name.filter((item: any) => item.subject_id == selectedValue);
  }

  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    // console.log(file);
    this.form.patchValue({
      excel: file
    });
    this.form.get('excel')?.updateValueAndValidity()
  }

  // submitFile() {
  //   this.apiservice.transactionFileUpload(this.form.value.excel).subscribe((data: any) => {
  //     console.log('AAA');
  //     console.log(data);
  //     if (data.success) {
  //       this.message = data.success
  //     } else {
  //       this.message = data.failed
  //     }
  //   },
  //     error => {
  //
  //     })
  // }
  submitFile() {
    this.apiservice.transactionFileUpload(this.form.value.excel).subscribe(
      (data: any) => {
        console.log('AAA');
        console.log(data);
        if (data.success) {
          this.message = data.success;
        } else {
          this.message = data.failed;
        }
      },
      error => {
        console.error('Error during file upload:', error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    );
  }

}

// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ApiserviceService } from '../apiservice.service';
// import Swal from 'sweetalert2';
// import { ActivatedRoute, Router } from '@angular/router';
//
// @Component({
//   selector: 'app-add-data',
//   templateUrl: './add-data.component.html',
//   styleUrls: ['./add-data.component.scss']
// })
// export class AddDataComponent {
//
//   ack_no: any; state_name: any;
//   district_name: any; station_name: any;
//   crime_info: any;
//   category: any;
//   sub_category: any; c_status: any; incident_date: any;
//   complaint_date: any; last_action_date: any;
//   complainant_name: any; complainant_mobile: any;
//   complainant_email: any; complainant_address: any;
//   suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
//   transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any;
//   transaction_id: any; transaction_amount: any; officers: any;payment_id:any;subject_id:any;
//   myForm: FormGroup | any;
//   prod_names: any;
//   insurance: any;
//   office_names: any;
//   bank_name: any;
//   type_name: any;
//   list_name: any;
//   flocations: any = [];
//   tlocations: any = [];
//   locations1: any = [];
//   id: any;
//   title = 'csvupload';
//   form: FormGroup;
//   message: any;
//   sub_name:any;
//
//   constructor(private fb: FormBuilder, private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) {
//     this.form = this.fb.group({
//       excel: [null]
//     })
//   }
//   ngOnInit(): void {
//     this.apiservice.view_staff().subscribe((res) => {
//       this.prod_names = res;
//     });
//     this.apiservice.view_type().subscribe((res) => {
//       this.type_name = res;
//     });
//     this.apiservice.view_all_subjects().subscribe((res) => {
//       this.sub_name = res;
//     });
//
//     this.id = this.route.snapshot.params['id'];
//     console.log(this.id);
//     this.myForm = new FormGroup(
//       {
//         ack_no: new FormControl('', Validators.required),
//         state_name: new FormControl(''),
//         district_name: new FormControl(''),
//         station_name: new FormControl(''),
//         crime_info: new FormControl(''),
//         category: new FormControl(''),
//         sub_category: new FormControl(''),
//         c_status: new FormControl(''),
//         incident_date: new FormControl(''),
//         complaint_date: new FormControl(''),
//         last_action_date: new FormControl(''),
//         complainant_name: new FormControl(''),
//         complainant_mobile: new FormControl(''),
//         complainant_email: new FormControl(''),
//         complainant_address: new FormControl(''),
//         suspect_name: new FormControl(''),
//         suspect_mobile: new FormControl(''),
//         suspect_id_no: new FormControl(''),
//         amount: new FormControl(''),
//         transaction_type: new FormControl(''),
//         ac_bank_name: new FormControl(''),
//         ac_no: new FormControl(''),
//         ifsc_code: new FormControl(''),
//         transaction_id: new FormControl(''),
//         transaction_amount: new FormControl(''),
//         officers: new FormControl(''),
//         payment_id: new FormControl(''),
//         subject_id: new FormControl(''),
//       }
//     );
//     this.apiservice.view_ccp_details_id(this.id).subscribe((res: any) => {
//       if (res.status == 'ok') {
//         this.myForm.get('ack_no').setValue(res.ack_no);
//         this.myForm.get('state_name').setValue(res.state_name);
//         this.myForm.get('district_name').setValue(res.district_name);
//         this.myForm.get('station_name').setValue(res.station_name);
//         this.myForm.get('crime_info').setValue(res.crime_info);
//         this.myForm.get('category').setValue(res.category);
//         this.myForm.get('sub_category').setValue(res.sub_category);
//         this.myForm.get('c_status').setValue(res.c_status);
//         this.myForm.get('incident_date').setValue(res.incident_date);
//         this.myForm.get('complaint_date').setValue(res.complaint_date);
//         this.myForm.get('last_action_date').setValue(res.last_action_date);
//         this.myForm.get('complainant_name').setValue(res.complainant_name);
//         this.myForm.get('complainant_mobile').setValue(res.complainant_mobile);
//         this.myForm.get('complainant_email').setValue(res.complainant_email);
//         this.myForm.get('complainant_address').setValue(res.complainant_address);
//         this.myForm.get('suspect_name').setValue(res.suspect_name);
//         this.myForm.get('suspect_mobile').setValue(res.suspect_mobile);
//         this.myForm.get('suspect_id_no').setValue(res.suspect_id_no);
//         this.myForm.get('amount').setValue(res.amount);
//         this.myForm.get('transaction_type').setValue(res.transaction_type);
//         this.myForm.get('ac_bank_name').setValue(res.ac_bank_name);
//         this.myForm.get('ac_no').setValue(res.ac_no);
//         this.myForm.get('ifsc_code').setValue(res.ifsc);
//         this.myForm.get('transaction_id').setValue(res.transaction_id);
//         this.myForm.get('transaction_amount').setValue(res.transaction_amount);
//         this.myForm.get('officers').setValue(res.officers);
//         this.myForm.get('payment_id').setValue(res.officers);
//         this.myForm.get('subject_id').setValue(res.officers);
//       }
//     })
//   }
//   onSubmit() {
//     this.myForm.markAllAsTouched();
//     // console.log('Advance Date', this.myForm.get('advance_date').value);
//     if (this.myForm.valid) {
//       var data = Array();
//       data.push(this.myForm.get('ack_no').value);
//       data.push(this.myForm.get('state_name').value);
//       data.push(this.myForm.get('district_name').value);
//       data.push(this.myForm.get('station_name').value);
//       data.push(this.myForm.get('crime_info').value);
//       data.push(this.myForm.get('category').value);
//       data.push(this.myForm.get('sub_category').value);
//       data.push(this.myForm.get('c_status').value);
//       data.push(this.myForm.get('incident_date').value);
//       data.push(this.myForm.get('complaint_date').value);
//       data.push(this.myForm.get('last_action_date').value);
//       data.push(this.myForm.get('complainant_name').value);
//       data.push(this.myForm.get('complainant_mobile').value);
//       data.push(this.myForm.get('complainant_email').value);
//       data.push(this.myForm.get('complainant_address').value);
//       data.push(this.myForm.get('suspect_name').value);
//       data.push(this.myForm.get('suspect_mobile').value);
//       data.push(this.myForm.get('suspect_id_no').value);
//       data.push(this.myForm.get('amount').value);
//       data.push(this.myForm.get('transaction_type').value);
//       data.push(this.myForm.get('ac_bank_name').value);
//       data.push(this.myForm.get('ac_no').value);
//       data.push(this.myForm.get('ifsc_code').value);
//       data.push(this.myForm.get('transaction_id').value);
//       data.push(this.myForm.get('transaction_amount').value);
//       data.push(this.myForm.get('officers').value);
//       data.push(this.myForm.get('payment_id').value);
//       data.push(this.myForm.get('subject_id').value);
//       data.push(this.id);
//       this.apiservice.add_products(data).subscribe((res: any) => {
//
//         Swal.fire({
//           title: 'Request Sent to Concern Person',
//           icon: 'success',
//         })
//         // location.href = "https://mail.google.com/mail/u/0/#inbox?compose=new"
//         location.href = "/waiting-approval"
//
//         // if (this.myForm.get('transaction_type').value == '' && this.myForm.get('officers').value == '') {
//         //   this.router.navigate(['/csr-report'])
//         // }
//         // else if (this.myForm.get('payment_date').value == '') {
//         //   this.router.navigate(['payment-pending'])
//         // }
//         // else {
//         //   this.router.navigate(['consolidated'])
//         // }
//       });
//     }
//   }
//
//   uploadFile(event: any) {
//     const file = event.target.files ? event.target.files[0] : '';
//     // console.log(file);
//     this.form.patchValue({
//       excel: file
//     });
//     this.form.get('excel')?.updateValueAndValidity()
//   }
//
//
//   submitFile() {
//     this.apiservice.transactionFileUpload(this.form.value.excel).subscribe((data: any) => {
//         // console.log('AAA');
//         console.log(data);
//         if (data.success) {
//           this.message = data.success
//         } else {
//           this.message = data.failed
//         }
//       },
//       error => {
//
//       })
//   }
// }
