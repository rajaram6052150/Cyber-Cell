import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.component.html',
  styleUrls: ['./view-records.component.scss']
})
export class ViewRecordsComponent {
  dtOptions: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  vendor_names: any;
  table_data: any;
  // ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  // category: any; sub_category: any; c_status: any; incident_date: any;
  // complaint_date: any; last_action_date: any;
  // complainant_name: any; complainant_mobile: any;
  // complainant_email: any; complainant_address: any;
  // suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  // transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any; transaction_id: any; transaction_amount: any; officers: any;
  // request_pending: any; approved: any; sign: any; rest:any;
  constructor(private apiservice: ApiserviceService) { }
  ngAfterViewInit(): void {
    this.apiservice.view_crime().subscribe((res) => {
      this.table_data = res;

    })
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
    let currentDate = new Date().toJSON().slice(0, 10);
    this.myForm = new FormGroup(
      {
        fromdate: new FormControl(currentDate),
        todate: new FormControl(currentDate),
      }
    );
    this.apiservice.view_crime().subscribe((res) => {
      this.table_data = res;
      console.log(this.table_data);
    })
  }


  // onSubmit() {
  //   this.table_data=[];
  //   this.apiservice.view_payment_all(
  //     this.myForm.get('fromdate').value,
  //     this.myForm.get('todate').value
  //   ).subscribe((res) => {
  //     this.table_data = res;
  //   })
  // }
  remove(id: any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_intimation(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
