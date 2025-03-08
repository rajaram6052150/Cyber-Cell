import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AddDataComponent } from './add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { TestingComponent } from './testing/testing.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { ViewHospitalComponent } from './view-hospital/view-hospital.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CompanyComponent } from './company/company.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { ConsolidatedComponent } from './consolidated/consolidated.component';
import { DataTablesModule } from 'angular-datatables';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { AdvanceInfoComponent } from './advance-info/advance-info.component';
import { ViewAdvanceComponent } from './view-advance/view-advance.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ViewMaintenanceComponent } from './view-maintenance/view-maintenance.component';
import { ComplaintReportComponent } from './complaint-report/complaint-report.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { BankCsrReportComponent } from './bank-csr-report/bank-csr-report.component';
import { PendingRequestComponent } from './pending-request/pending-request.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddOfficerComponent } from './add-officer/add-officer.component';
import { ViewOfficerComponent } from './view-officer/view-officer.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { ViewBankDetailsComponent } from './view-bank-details/view-bank-details.component';
import { AddSocialMediaComponent } from './add-social-media/add-social-media.component';
import { ViewSocialMediaComponent } from './view-social-media/view-social-media.component';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { ViewMerchantComponent } from './view-merchant/view-merchant.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { ViewDomainComponent } from './view-domain/view-domain.component';
import { MerchantCsrReportComponent } from './merchant-csr-report/merchant-csr-report.component';
import { SocialCsrReportComponent } from './social-csr-report/social-csr-report.component';
import { DomainCsrReportComponent } from './domain-csr-report/domain-csr-report.component';
import { CombinedBankReportsComponent } from './combined-bank-reports/combined-bank-reports.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddDataComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UploadFileComponent,
    TestingComponent,
    AddVendorComponent,
    AddInsuranceComponent,
    AddBankComponent,
    ViewHospitalComponent,
    ViewVendorComponent,
    ViewInsuranceComponent,
    InvoiceComponent,
    CompanyComponent,
    ViewRecordsComponent,
    ConsolidatedComponent,
    AddOfficeComponent,
    ViewOfficeComponent,
    AddLocationComponent,
    ViewLocationComponent,
    AdvanceInfoComponent,
    ViewAdvanceComponent,
    MaintenanceComponent,
    ViewMaintenanceComponent,
    ComplaintReportComponent,
    AddServicesComponent,
    BankCsrReportComponent,
    PendingRequestComponent,
    ApproveListComponent,
    RegisterComponent,
    DashboardComponent,
    AddOfficerComponent,
    ViewOfficerComponent,
    ViewCardComponent,
    UpdateDataComponent,
    ViewBankDetailsComponent,
    AddSocialMediaComponent,
    ViewSocialMediaComponent,
    AddMerchantComponent,
    ViewMerchantComponent,
    AddDomainComponent,
    ViewDomainComponent,
    MerchantCsrReportComponent,
    SocialCsrReportComponent,
    DomainCsrReportComponent,
    CombinedBankReportsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
