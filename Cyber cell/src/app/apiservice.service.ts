import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  website = "http://127.0.0.1/ccp_new-old-new/api/";

  sub: any;
  // website = "/mani_api/";
  // website = "http://43.205.232.221/mani_api/";
  constructor(private http: HttpClient, private Cookies: CookieService) { }
  // ***********
  signup(name: any, email: any, uname: any, pass: any): Observable<Object> {
    var url2 = this.website + 'new_user.php';
    var formData = new FormData();
    formData.append('name', name);
    formData.append('username', uname);
    formData.append('email', email);
    formData.append('password', pass);
    return this.http.post(url2, formData);
  }

  setSession(session: any) {
    localStorage.setItem('token', session.token);
    localStorage.setItem('expires_at', JSON.stringify(session.expire));
  }
  signin(uname: any, pass: any): Observable<Object> {
    var url2 = this.website + 'signin.php';
    var formData = new FormData();
    formData.append('username', uname);
    formData.append('password', pass);
    return this.http.post(url2, formData);
  }
  get_profile(uname: any): Observable<Object> {
    var url2 = this.website + 'get_profile.php';
    var formData = new FormData();
    formData.append('username', uname);
    return this.http.post(url2, formData);
  }

  getDashboardData(): Observable<any> {
    const url = this.website + 'get_dash.php';
    console.log(this.http.get(url));
    return this.http.get(url);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
  verify(): Observable<Object> {
    var token: any = localStorage.getItem('token');
    var url2 = this.website + 'verify.php';
    var formData = new FormData();
    formData.append('token', token);
    return this.http.post(url2, formData);
  }
  authenticate() {
    this.verify().subscribe((res: any) => {
      if (res.status == 'ok') {
        return true;
      } else {
        return false;
      }
    });
  }

  // *******************
  checking(): Observable<Object> {
    var token = this.Cookies.get('token');
    if (token == 'qwerty') {
      token = 'empty';
    }
    var url = this.website + 'token.php';
    var formData = new FormData();
    formData.append('token', token);
    return this.http.post(url, formData);
  }
  // signin(username:any,password:any): Observable<Object> {
  //   var url = this.website + 'signin.php';
  //   var formData = new FormData();
  //   formData.append("username", username);
  //   formData.append("password", password);
  //   return this.http.post(url, formData);
  // }
  settoken(token: any) {
    this.Cookies.set('token', token);
  }
  // signout() {
  //   var token = this.Cookies.get('token');
  //   if (token == '') { token = 'empty' }
  //   else {
  //     this.Cookies.delete('token');
  //   }
  // }
  add_products(data: any): Observable<Object> {
    var url = this.website + 'add_data.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  add_hospital(hname: any, hplace: any, id: any): Observable<Object> {
    var url = this.website + 'add_hospital.php';
    var formData = new FormData();
    formData.append('hname', hname);
    formData.append('hplace', hplace);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_vendor(vname: any, id: any): Observable<Object> {
    var url = this.website + 'add_vendor.php';
    var formData = new FormData();
    formData.append('vname', vname);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_insurance(
    iname: any,
    id: any,
    address1: any,
    address2: any,
    gstin: any
  ): Observable<Object> {
    var url = this.website + 'add_insurance.php';
    var formData = new FormData();
    formData.append('iname', iname);
    formData.append('address1', address1);
    formData.append('address2', address2);
    formData.append('gstin', gstin);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_company(
    iname: any,
    pan: any,
    gstin: any,
    hsn: any,
    description: any,
    bank: any,
    branch: any,
    accno: any,
    ifsc: any
  ): Observable<Object> {
    var url = this.website + 'add_company.php';
    var formData = new FormData();
    formData.append('iname', iname);
    formData.append('pan', pan);
    formData.append('gstin', gstin);
    formData.append('hsn', hsn);
    formData.append('description', description);
    formData.append('bank', bank);
    formData.append('branch', branch);
    formData.append('accno', accno);
    formData.append('ifsc', ifsc);
    return this.http.post(url, formData);
  }
  view_company(): Observable<Object> {
    var url = this.website + 'view_company.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_insurance(): Observable<Object> {
    var url = this.website + 'view_insurance.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_invoice(id: any): Observable<Object> {
    var url = this.website + 'view_invoice.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_insurance_id(id: any): Observable<Object> {
    var url = this.website + 'view_insurance_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_ccp_details_id(id: any): Observable<Object> {
    var url = this.website + 'view_ccp_details_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_bank_details(ack_no: any, ac_bank_name: any): Observable<Object> {
    var url = this.website + 'ac_transaction.php';
    var formData = new FormData();
    formData.append('ack_no', ack_no);
    formData.append('ac_bank_name', ac_bank_name);
    return this.http.post(url, formData);
  }
  view_csr_report_id(ac_no: any): Observable<Object> {
    var url = this.website + 'view_csr_report_id.php';
    var formData = new FormData();
    formData.append('ac_no', ac_no);
    return this.http.post(url, formData);
  }
  view_excel_data(ack_no: any): Observable<Object> {
    var url = this.website + 'view_excel_data.php';
    var formData = new FormData();
    formData.append('ack_no', ack_no);
    return this.http.post(url, formData);
  }
  csr_report(id: any): Observable<Object> {
    var url = this.website + 'csr_report.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_names(): Observable<Object> {
    var url = this.website + 'view_hospitals.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_hospitals_id(id: any): Observable<Object> {
    var url = this.website + 'view_hospitals_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_vendors(): Observable<Object> {
    var url = this.website + 'view_vendors.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_vendors_id(id: any): Observable<Object> {
    var url = this.website + 'view_vendors_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_sales(): Observable<Object> {
    var url = this.website + 'view_intimation.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }


  // csvFileUpload(csvFile: File): Observable<Object> {
  //   const url = this.website + 'csv_upload.php';
  //   const formData = new FormData();
  //   formData.append('fileToUpload', csvFile);
  //
  //   // Ensure the Content-Type is not set to 'application/json'
  //   const options = {
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   };
  //
  //   return this.http.post(url, formData, options);
  // }
  //   csvFileUpload(csvFile: File): Observable<any> {
  //       const url = this.website + 'csv_upload.php';
  //       const formData = new FormData();
  //       formData.append('file', csvFile);
  //
  //       // Send the HTTP request with FormData
  //       return this.http.post(url, formData);
  //   }
  csvFileUpload(csvFile: File): Observable<any> {
    console.log("AA");
    var url = this.website + 'csv_upload.php';
    var formData = new FormData();
    formData.append('fileToUpload', csvFile);
    console.log(this.http.post(url, formData));
    return this.http.post(url, formData);
  }

  transactionFileUpload(csvFile: File): Observable<object> {
    var url = this.website + 'transaction.php';
    var formData = new FormData();
    formData.append('transactionupload', csvFile);
    return this.http.post(url, formData);
  }
  view_payment(): Observable<Object> {
    var url = this.website + 'file.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_payment_all(fdate: any, tdate: any): Observable<Object> {
    var url = this.website + 'details.php';
    var formData = new FormData();
    formData.append('tdate', tdate);
    return this.http.post(url, formData);
    formData.append('fdate', fdate);
    formData.append('tdate', tdate);
    return this.http.post(url, formData);
  }
  view_consolidated(): Observable<Object> {
    var url = this.website + 'view_consolidated.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_consolidated_all(fdate: any, tdate: any): Observable<Object> {
    var url = this.website + 'view_consolidated_all.php';
    var formData = new FormData();
    formData.append('fdate', fdate);
    formData.append('tdate', tdate);
    return this.http.post(url, formData);
  }
  view_details(gicsid: any): Observable<Object> {
    var url = this.website + 'view_details.php';
    var formData = new FormData();
    formData.append('gicsid', gicsid);
    return this.http.post(url, formData);
  }
  del_hospital(id: any): Observable<Object> {
    var url = this.website + 'del_hospital.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_intimation(id: any): Observable<Object> {
    var url = this.website + 'del_intimation.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_vendors(id: any): Observable<Object> {
    var url = this.website + 'del_vendors.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_insurance(id: any): Observable<Object> {
    var url = this.website + 'del_insurance.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_offices_id(id: any): Observable<Object> {
    var url = this.website + 'view_offices_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_office(hname: any, hplace: any, id: any): Observable<Object> {
    var url = this.website + 'add_office.php';
    var formData = new FormData();
    formData.append('hname', hname);
    formData.append('hplace', hplace);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_offices(): Observable<Object> {
    var url = this.website + 'view_offices.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_crime(): Observable<Object> {
    var url = this.website + 'view_ccp_details.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  request_pending(): Observable<Object> {
    var url = this.website + 'pending_request_list.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  approve_list(): Observable<Object> {
    var url = this.website + 'approve_list.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  approve_list1(): Observable<Object> {
    var url = this.website + 'approved_cases.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  abdul_approve_list(): Observable<Object> {
    var url = this.website + 'abdul_approved_cases.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_combined_bank_list(id: any): Observable<Object> {
    var url = this.website + 'combined_bank.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_office(id: any): Observable<Object> {
    var url = this.website + 'del_office.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_city(): Observable<Object> {
    var url = this.website + 'view_city.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_city_id(id: any): Observable<Object> {
    var url = this.website + 'view_city_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_city(hname: any, hplace: any, id: any): Observable<Object> {
    var url = this.website + 'add_city.php';
    var formData = new FormData();
    formData.append('hname', hname);
    formData.append('hplace', hplace);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_city(id: any): Observable<Object> {
    var url = this.website + 'del_city.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }

  add_advance(data: any): Observable<Object> {
    var url = this.website + 'add_advance.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_advance_id(id: any): Observable<Object> {
    var url = this.website + 'view_advance_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_advance(): Observable<Object> {
    var url = this.website + 'view_advance.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_advance_all(lorry_no: any, fdate: any, tdate: any): Observable<Object> {
    var url = this.website + 'view_advance_all.php';
    var formData = new FormData();
    formData.append('lorry_no', lorry_no);
    formData.append('fdate', fdate);
    formData.append('tdate', tdate);
    return this.http.post(url, formData);
  }
  del_advance(id: any): Observable<Object> {
    var url = this.website + 'del_advance.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }

  add_maintenance(data: any): Observable<Object> {
    var url = this.website + 'add_maintenance.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_maintenance_id(id: any): Observable<Object> {
    var url = this.website + 'view_maintenance_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_maintenance(): Observable<Object> {
    var url = this.website + 'view_maintenance.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  del_maintenance(id: any): Observable<Object> {
    var url = this.website + 'del_maintenance.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  add_service(service: any, id: any): Observable<Object> {
    var url = this.website + 'add_service.php';
    var formData = new FormData();
    formData.append('service', service);
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_services(): Observable<Object> {
    var url = this.website + 'view_services.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_service_id(id: any): Observable<Object> {
    var url = this.website + 'view_service_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  del_services(id: any): Observable<Object> {
    var url = this.website + 'del_services.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }

  // Officer List

  add_staff(data: any, file: any): Observable<Object> {
    var url = this.website + 'add_staff.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    formData.append('file', file);
    formData.append('filestat', 'Y');
    if (file == '') {
      formData.append('filestat', 'N');
    }
    return this.http.post(url, formData);
  }
  view_staff_id(id: any): Observable<Object> {
    var url = this.website + 'view_staff_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_staff(): Observable<Object> {
    var url = this.website + 'view_staff.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }

  // Add Bank details
  add_bank(data: any): Observable<Object> {
    var url = this.website + 'add_bank.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_bank_id(id: any): Observable<Object> {
    var url = this.website + 'view_bank_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_bank(): Observable<Object> {
    var url = this.website + 'view_bank.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  // Bank details End

  // Add New Merchant details
  add_merchant(data: any): Observable<Object> {
    var url = this.website + 'add_merchant.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_merchant_id(id: any): Observable<Object> {
    var url = this.website + 'view_merchant_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_merchant(): Observable<Object> {
    var url = this.website + 'view_merchant.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  // Merchant details End

  // Social Media details Start
  add_social(data: any): Observable<Object> {
    var url = this.website + 'add_social.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_social_id(id: any): Observable<Object> {
    var url = this.website + 'view_social_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_social(): Observable<Object> {
    var url = this.website + 'view_social.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  // Social Media details End

  // Social Media details Start
  add_domain(data: any): Observable<Object> {
    var url = this.website + 'add_domain.php';
    var formData = new FormData();
    formData.append('values', JSON.stringify(data));
    return this.http.post(url, formData);
  }
  view_domain_id(id: any): Observable<Object> {
    var url = this.website + 'view_domain_id.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
  view_domain(): Observable<Object> {
    var url = this.website + 'view_domain.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  // Social Media details End

  // Transaction Type Start
  view_type(): Observable<Object> {
    var url = this.website + 'view_all_subject.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_all_subjects(): Observable<Object> {
    var url = this.website + 'subject_list.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  view_subject(ack_no: any): Observable<Object> {
    var url = this.website + 'subject.php';
    var formData = new FormData();
    formData.append('ack_no', ack_no);
    return this.http.post(url, formData);
  }
  bank_details(bank_name: any): Observable<Object> {
    var url = this.website + 'bank_details.php';
    var formData = new FormData();
    formData.append('bank_name', bank_name);
    return this.http.post(url, formData);
  }
  view_services_list(): Observable<Object> {
    var url = this.website + 'view_services_list.php';
    var formData = new FormData();
    return this.http.post(url, formData);
  }
  del_staff(id: any): Observable<Object> {
    var url = this.website + 'del_staff.php';
    var formData = new FormData();
    formData.append('id', id);
    return this.http.post(url, formData);
  }
}
