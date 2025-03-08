import { Component,OnInit,OnDestroy } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Subscription} from "rxjs";

interface DashboardData {
  total: string;
  pending: string;
  approved: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardDataSubscription: Subscription | undefined;
  data:any;
  totalCases: number = 0;
  pendingCases: number = 0;
  approvedCases: number = 0;
  constructor(private auth: ApiserviceService) {}



  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngOnDestroy(): void {
    if (this.dashboardDataSubscription) {
      this.dashboardDataSubscription.unsubscribe();
    }
  }

  fetchDashboardData(): void {
    this.auth.getDashboardData().subscribe({
      next: (data: DashboardData) => {

        this.totalCases = +data.total; // Convert string to number using unary plus operator
        this.pendingCases = +data.pending;
        this.approvedCases = +data.approved;
      },
      error: (error: any) => {
        console.error('Error fetching dashboard data:', error);
      }
    });
  }





}
