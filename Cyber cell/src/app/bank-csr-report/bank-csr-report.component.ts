import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-csr-report',
  templateUrl: './bank-csr-report.component.html',
  styleUrls: ['./bank-csr-report.component.scss']
})
export class BankCsrReportComponent {
  ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  category: any; sub_category: any; c_status: any; incident_date: any;
  complaint_date: any; last_action_date: any;
  complainant_name: any; complainant_mobile: any;
  complainant_email: any; complainant_address: any;
  suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any;
  transaction_id: any; transaction_amount: any; officers: any; sign: any;
  ac_subject: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  office_names: any;
  flocations: any = [];
  tlocations: any = [];
  locations1: any = [];
  id: any;
  table_data: any;
  table_data1: any;
  table_data2: any;
  data: any;
  data1: any;
  result: any;
  invoice: any;
  total_amt: any;
  words: any;
  gst = false;
  bank_name: any;
  bank_details: any;
  sub_name: any;

  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.ack_no = this.route.snapshot.params['id'];
    this.bank_name = this.route.snapshot.params['any'];
    this.apiservice.view_excel_data(this.ack_no).subscribe((res: any) => {
      this.table_data1 = res;
      this.sign = "http://44.211.166.253/api/ccp/sign_uploads/" + res.sign
    })
    this.apiservice.view_bank_details(this.ack_no, this.bank_name).subscribe((res: any) => {
      this.table_data = res;
    })
    this.apiservice.view_subject(this.ack_no).subscribe((res: any) => {
      this.sub_name = res.subject_desc;
    });
    this.apiservice.bank_details(this.bank_name).subscribe((res: any) => {
      this.bank_details = res;
    });
  }
  async downloadPdf() {
    let width = +document.querySelector('#invoice')!.clientWidth + 2;
    let height = +document.querySelector('#invoice')!.clientHeight + 2;
    let doc = new jsPDF('p', 'px', [width, height]);
    await doc.html(document.querySelector('#page') as HTMLElement)
    doc.output('pdfobjectnewwindow', { filename: this.invoice });
  }
}

