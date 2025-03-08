import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  selectedFile:any;


  constructor(private http: HttpClient) {}



  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://192.168.14.18/ccp_new-current/api/csv_upload.php', formData).subscribe(
      (response) => {
        console.log('File upload response:', response);
        if (response.success) {
          console.log('File uploaded successfully!');
        } else {
          console.error('File upload failed:', response.error);
        }
      },
      (error) => {
        console.error('Error occurred while uploading file:', error);
      }
    );
  }


  // title = 'csvupload';
  //
  // form: FormGroup;
  // message: any;
  //
  // constructor(private fb: FormBuilder, private csvService: ApiserviceService) {
  //   this.form = this.fb.group({
  //     excel: [null]
  //   })
  //
  // }
  //
  // uploadFile(event: any) {
  //   const file = event.target.files ? event.target.files[0] : '';
  //   // console.log(file);
  //   this.form.patchValue({
  //     excel: file
  //   });
  //   this.form.get('excel')?.updateValueAndValidity()
  // }


    // submitFile() {
  //   this.csvService.csvFileUpload(this.form.value.excel).subscribe(
  //     (data: any) => {
  //       console.log('AAA');
  //       console.log(data);
  //       if (data.success) {
  //         this.message = data.success;
  //       } else {
  //         this.message = data.failed;
  //       }
  //     },
  //     error => {
  //       console.error('Error uploading file:', error);
  //     }
  //   );
  // }


  // submitFile() {
  //   this.csvService.csvFileUpload(this.form.value.excel).subscribe((data: any) => {
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


  // submitFile() {
  //   this.csvService.csvFileUpload(this.form.value.excel).subscribe(
  //      (response: any) => {
  //       console.log("BBB");
  //
  //   });
  // }





}

