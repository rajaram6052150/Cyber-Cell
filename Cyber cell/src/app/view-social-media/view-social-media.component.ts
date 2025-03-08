import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-social-media',
  templateUrl: './view-social-media.component.html',
  styleUrls: ['./view-social-media.component.scss']
})
export class ViewSocialMediaComponent {
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
    this.apiservice.view_social().subscribe((res) => {
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

