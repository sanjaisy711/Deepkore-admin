import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminSharedModule } from "../admin-shared/shared.module";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { LeadManagementModule } from "./lead-management/lead-management.module";
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminSharedModule,
    RouterModule,
    NgApexchartsModule,
    LeadManagementModule,
    ChartModule
  ]
})
export class AdminLayoutModule { }
