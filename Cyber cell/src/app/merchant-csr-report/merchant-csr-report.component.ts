import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-merchant-csr-report',
  templateUrl: './merchant-csr-report.component.html',
  styleUrls: ['./merchant-csr-report.component.scss']
})
export class MerchantCsrReportComponent {
  ack_no: any; state_name: any; district_name: any; station_name: any; crime_info: any;
  category: any; sub_category: any; c_status: any; incident_date: any;
  complaint_date: any; last_action_date: any;
  complainant_name: any; complainant_mobile: any;
  complainant_email: any; complainant_address: any;
  suspect_name: any; suspect_mobile: any; suspect_id_no: any; amount: any;
  transaction_type: any; ac_bank_name: any; ac_no: any; ifsc: any;
  transaction_id: any; transaction_amount: any; officers: any; sign: any;
  ac_subject:any;
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
  sub_name:any;

  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.apiservice.view_csr_report_id(this.id).subscribe((res: any) => {
      this.table_data1 = res;
      this.data = res.data;

    })
    this.apiservice.view_ccp_details_id(this.id).subscribe((res: any) => {
      this.table_data = res;
      this.data = res.data;
    })
    this.apiservice.view_all_subjects().subscribe((res) => {
      this.sub_name = res;
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
