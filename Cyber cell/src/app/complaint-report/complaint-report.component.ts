import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.scss']
})
export class ComplaintReportComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  dtOptions: any;
  table_data: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: false,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
    this.apiservice.view_services().subscribe((res) => {
      this.table_data = res;
    });
  }
  remove(id: any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_services(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
