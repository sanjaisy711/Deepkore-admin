import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { ListComponent } from './list/list.component';
import { AdminSharedModule } from "../../admin-shared/shared.module";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    AdminSharedModule,
    MatDialogModule
  ]
})
export class PlanModule { }
