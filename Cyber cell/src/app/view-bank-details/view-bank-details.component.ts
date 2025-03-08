import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-bank-details',
  templateUrl: './view-bank-details.component.html',
  styleUrls: ['./view-bank-details.component.scss']
})
export class ViewBankDetailsComponent {
  table_data: any;
  dtOptions: any = {};
  constructor(private apiservice: ApiserviceService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.apiservice.view_bank().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_staff(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
