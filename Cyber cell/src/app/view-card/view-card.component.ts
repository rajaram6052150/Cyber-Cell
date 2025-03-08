import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {
  constructor(private apiservice: ApiserviceService, private route: ActivatedRoute) { }
  id: any;
  staff_details: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.apiservice.view_staff_id(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.staff_details=res;
      }
    });
  }
  async downloadPdf() {
    let width = document.querySelector('#holder')!.clientWidth + 300;
    let height = document.querySelector('#holder')!.clientHeight + 1;
    let doc = new jsPDF('p', 'px', [780, 550]);
    console.log(doc.getFontList());
    doc.setFont('Helvetica');
    await doc.html(document.querySelector('#holder') as HTMLElement)
    doc.output('pdfobjectnewwindow');
  }
}