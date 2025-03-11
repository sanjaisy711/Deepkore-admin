import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ColumnSettingsModel, TablePaginationSettingsModel } from '../../../admin-shared/custom-table/table-settings.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalComponent } from '../../../admin-shared/dialogue/add-customer-modal/add-customer-modal.component';
import { PopupBoxComponent } from "../../../admin-shared/dialogue/popup-box/popup-box.component";
import { AddUserModalComponent } from 'src/app/admin/admin-shared/dialogue/add-user-modal/add-user-modal.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  columnDefinition: ColumnSettingsModel[] = [];
  tablePaginationSettings: TablePaginationSettingsModel = <TablePaginationSettingsModel>{};
  rowData: any = [];
  constructor(private http: HttpserviceService, private router: Router, public dialog: MatDialog) {
    this.tablePaginationSettings.enablePagination = true;
    this.tablePaginationSettings.pageIndex = 1;
    this.tablePaginationSettings.pageSize = 5;
    this.tablePaginationSettings.pageSizeOptions = [5, 10, 15];
    this.tablePaginationSettings.showFirstLastButtons = true;
    this.columnDefinition = [
      {
        'name': 'lead_name',
        'displayName': 'Lead Name',
        'disableSorting': false,
      },
      {
        'name': 'onboarded_date',
        'displayName': 'On Boarded Date',
        'disableSorting': false,
        'isDate': true
      },
      {
        'name': 'subscription_validity',
        'displayName': 'Subscription Validity',
        'disableSorting': false,
        'isDate': true
      },
      {
        'name': 'remind_before',
        'displayName': 'Reminder Days',
        'disableSorting': false,
      },
      {
        'name': 'plan_name',
        'displayName': 'Plan Name',
        'disableSorting': false,
      },
      {
        'name': 'purchase_id',
        'displayName': 'Purchase Id',
        'disableSorting': false,
      },
      {
        'name': 'dzitrauser_display_name',
        'displayName': 'Converted By',
        'disableSorting': false,
      },
      // {
      //   'name': 'actiontwo',
      //   'displayName': 'Action',
      //   'disableSorting': false,
      //   'isAction': 1
      // },
    ];
  }

  ngOnInit(): void {
    this.initData();

  }
  initData() {
    this.http.get(`/customer/list/createdAt/-1/${this.tablePaginationSettings.pageIndex}/${this.tablePaginationSettings.pageSize}?`).subscribe(
      (results) => {
        this.rowData = results.data.list;
        this.tablePaginationSettings.totalElements = results.data.pagination.total;
      }
    )
  }
  onNotifySelected(event: any) {
    console.log(event, 'selected');
  }
  isPageChanged(event: any) {
    this.tablePaginationSettings.pageSize = event.pageSize;
    this.tablePaginationSettings.pageIndex = event.pageIndex + 1;
    this.initData();
  }
  openDialogueModal(event: any) {
    if (event.method == 'add') {
      const dialogRef = this.dialog.open(AddCustomerModalComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'New Customer Added',
              text: `Congratulations! You've just added a new customer to your pipeline.`,
              Btn: 'Okay',
              isSuccess: true,
              showOnly: true
            },
            width: '35%',
          });
          successdialogue.afterClosed().subscribe(result => {
          });
        }
      });
    }
    else if (event.method == 'edit') {
      let rowId = event.id;
      const dialogRef = this.dialog.open(AddCustomerModalComponent, {
        data: { rowId }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Customer Edited',
              text: `Customer updated successfully`,
              Btn: 'Okay',
              isSuccess: true,
              showOnly: true
            },
            width: '35%',
          });
          successdialogue.afterClosed().subscribe(result => {
          });
        }
      });
    }
    else if (event.method == 'view') {
      let rowId = event.id;
      const dialogRef = this.dialog.open(AddCustomerModalComponent, {
        data: { 
          id:rowId,
          isReadonly: true
         },
        width: '60%',
      });
    }
  }
  openLeadinfo(leadinfo: any){
    let rowId = leadinfo.lead_id;
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        data: { id:rowId, isInfoscreen: true },
        width: '60%',
      });
  }
}