import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-combined-bank-reports',
  templateUrl: './combined-bank-reports.component.html',
  styleUrls: ['./combined-bank-reports.component.scss']
})
export class CombinedBankReportsComponent {


  dtOptions: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  vendor_names: any;
  table_data: any;
  id: any
  ack_no: any;
  
  // ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  // category: any; sub_category: any; c_status: any; incident_date: any;
  // complaint_date: any; last_action_date: any;
  // complainant_name: any; complainant_mobile: any;
  // complainant_email: any; complainant_address: any;
  // suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  constructor(private apiservice: ApiserviceService ,private router: Router, private route: ActivatedRoute) { }
  // ngAfterViewInit(): void {
  //   this.ack_no = this.route.snapshot.params['ack_no'];
  //   this.apiservice.view_combined_bank_list(this.ack_no).subscribe((res) => {
  //     this.table_data = res;
  //   })
  // }
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
    this.id = this.route.snapshot.params['id'];
    this.apiservice.view_combined_bank_list(this.id).subscribe((res) => {
      this.table_data = res;
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
  async downloadPdf() {
    let width = +document.querySelector('#invoice')!.clientWidth + 2;
    let height = +document.querySelector('#invoice')!.clientHeight + 2;
    let doc = new jsPDF('p', 'px', [width, height]);
    await doc.html(document.querySelector('#invoice') as HTMLElement)
    doc.output('pdfobjectnewwindow', { filename: this.dtOptions });
  }
  remove(id: any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_intimation(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}