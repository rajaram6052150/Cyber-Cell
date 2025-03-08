import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent {
  dtOptions: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  vendor_names: any;
  table_data: any;
  ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  category: any; sub_category: any; c_status: any; incident_date: any;
  complaint_date: any; last_action_date: any;
  complainant_name: any; complainant_mobile: any;
  complainant_email: any; complainant_address: any;
  suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  constructor(private apiservice: ApiserviceService) { }
  ngAfterViewInit(): void {
    this.apiservice.request_pending().subscribe((res) => {
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
    this.apiservice.request_pending().subscribe((res) => {
      this.table_data = res;
    })
  }
  // onSubmit() {
  //   this.apiservice.request_pending().subscribe((res) => {
  //     this.table_data = res;
  //   })
  // }
  approve() {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.approve_list().subscribe((res) => {
        location.reload();
      })
    }
  }
}


