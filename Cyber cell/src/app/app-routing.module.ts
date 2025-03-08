import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { LoginComponent } from './login/login.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { TestingComponent } from './testing/testing.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';

import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { ViewHospitalComponent } from './view-hospital/view-hospital.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CompanyComponent } from './company/company.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { ConsolidatedComponent } from './consolidated/consolidated.component';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
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
import { AddBankComponent } from './add-bank/add-bank.component';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { ViewMerchantComponent } from './view-merchant/view-merchant.component';
import { AddSocialMediaComponent } from './add-social-media/add-social-media.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { ViewDomainComponent } from './view-domain/view-domain.component';
import { ViewSocialMediaComponent } from './view-social-media/view-social-media.component';
import { CombinedBankReportsComponent } from './combined-bank-reports/combined-bank-reports.component';
import { ProfileComponent } from "./profile/profile.component";



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'edit-intimation/:id',component:AddDataComponent},
  {path:'edit-intimation',component:AddDataComponent},
  {path:'upload-file',component:UploadFileComponent,title:'File Upload'},
  {path:'view-csv-reports',component:ViewRecordsComponent},
  {path:'profile', component :ProfileComponent},

  {path:'consolidated',component:ConsolidatedComponent,title:'Consolidated Reports'},
  {path:'view/:id',component:TestingComponent},
  {path:'invoice/:id',component:InvoiceComponent},
  {path:'add-insurance',component:AddInsuranceComponent},
  {path:'add-insurance/:id',component:AddInsuranceComponent},
  {path:'add-office',component:AddOfficeComponent},
  {path:'add-office/:id',component:AddOfficeComponent},
  {path:'offices',component:ViewOfficeComponent,title:'Offices List'},
  {path:'add-city',component:AddLocationComponent},
  {path:'add-city/:id',component:AddLocationComponent},
  {path:'cities',component:ViewLocationComponent,title:'Cities List'},
  {path:'add-advance',component:AdvanceInfoComponent},
  {path:'add-advance/:id',component:AdvanceInfoComponent},
  {path:'advances',component:ViewAdvanceComponent,title:'Advances List'},
  {path:'new-maintenance',component:MaintenanceComponent},
  {path:'new-maintenance/:id',component:MaintenanceComponent},
  {path:'maintenance-list',component:ViewMaintenanceComponent,title:'Maintenance List'},
  {path:'add-service',component:AddServicesComponent},
  {path:'add-service/:id',component:AddServicesComponent},
  {path:'complaint-report',component:ComplaintReportComponent,title:'Complaints List'},
  {path:'add-vendor',component:AddVendorComponent},
  {path:'add-vendor/:id',component:AddVendorComponent},
  {path:'company',component:CompanyComponent},
  {path:'hospitals',component:ViewHospitalComponent},
  {path:'vendors',component:ViewVendorComponent},
  {path:'insurance',component:ViewInsuranceComponent},
  {path:'csr-report/:id/:any',component:BankCsrReportComponent},
  {path:'waiting-approval',component:PendingRequestComponent},
  {path:'approve-list',component:ApproveListComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'add-officer',component:AddOfficerComponent},
  {path:'add-officer/:id',component:AddOfficerComponent},
  {path:'view-officer',component:ViewOfficerComponent},
  {path:'view-card/:id',component:ViewCardComponent},
  {path:'update-data/:id',component:UpdateDataComponent},
  {path:'add-bank',component:AddBankComponent},
  {path:'add-bank/:id',component:AddBankComponent},
  {path:'view-bank',component:ViewBankDetailsComponent},
  {path:'view-bank/:id',component:ViewBankDetailsComponent},
  {path:'add-merchant',component:AddMerchantComponent},
  {path:'add-merchant/:id',component:AddMerchantComponent},
  {path:'view-merchant',component:ViewMerchantComponent},
  {path:'view-merchant/:id',component:ViewMerchantComponent},
  {path:'add-social-media',component:AddSocialMediaComponent},
  {path:'add-social-media/:id',component:AddSocialMediaComponent},
  {path:'view-social-media',component:ViewSocialMediaComponent},
  {path:'view-social-media/:id',component:ViewSocialMediaComponent},
  {path:'add-domain',component:AddDomainComponent},
  {path:'add-domain/:id',component:AddDomainComponent},
  {path:'view-domain',component:ViewDomainComponent},
  {path:'view-domain/:id',component:ViewDomainComponent},
  {path:'combined-list/:id',component:CombinedBankReportsComponent},
  {path:'app-register' ,component:RegisterComponent},
  {path:'**',component:UploadFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
