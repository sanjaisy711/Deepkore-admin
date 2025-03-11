import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CountersComponent } from './counters/counters.component';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from "@angular/material/sort";
import { AddUserModalComponent } from './dialogue/add-user-modal/add-user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PopupBoxComponent } from './dialogue/popup-box/popup-box.component';
import { StatusUpdateModalComponent } from './dialogue/status-update-modal/status-update-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AddCustomerModalComponent } from './dialogue/add-customer-modal/add-customer-modal.component';
import { AddPlanModalComponent } from './dialogue/add-plan-modal/add-plan-modal.component';
import { AddSubscriptionModalComponent } from './dialogue/add-subscription-modal/add-subscription-modal.component';
import { AddNewsletterModalComponent } from './dialogue/add-newsletter-modal/add-newsletter-modal.component';
import { DeleteConfirmModalComponent } from './dialogue/delete-confirm-modal/delete-confirm-modal.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    CountersComponent,
    CustomTableComponent,
    AddUserModalComponent,
    PopupBoxComponent,
    StatusUpdateModalComponent,
    AddCustomerModalComponent,
    AddPlanModalComponent,
    AddSubscriptionModalComponent,
    AddNewsletterModalComponent,
    DeleteConfirmModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CurrencyMaskModule
  ],
  exports: [
    CountersComponent,
    SidebarComponent,
    HeaderComponent,
    CustomTableComponent,
    AddUserModalComponent,
    AddCustomerModalComponent,
    DeleteConfirmModalComponent
  ],
  providers: [  
    MatDatepickerModule,  
    MatPaginatorIntl
  ],

})
export class AdminSharedModule { }
