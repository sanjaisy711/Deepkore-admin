import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ColumnSettingsModel, TablePaginationSettingsModel } from '../../../admin-shared/custom-table/table-settings.model';
import { MatDialog } from '@angular/material/dialog';
import { AddSubscriptionModalComponent } from '../../../admin-shared/dialogue/add-subscription-modal/add-subscription-modal.component';
import { PopupBoxComponent } from "../../../admin-shared/dialogue/popup-box/popup-box.component";
import { AddPlanModalComponent } from 'src/app/admin/admin-shared/dialogue/add-plan-modal/add-plan-modal.component';
import { AddCustomerModalComponent } from 'src/app/admin/admin-shared/dialogue/add-customer-modal/add-customer-modal.component';

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
        'name': 'plan_name',
        'displayName': 'Plan Name',
        'disableSorting': false,
        'isPopup': true
      },
      {
        'name': 'lead_name',
        'displayName': 'Customer Name',
        'disableSorting': false,

      },
      {
        'name': 'startdate',
        'displayName': 'Start Date',
        'disableSorting': false,
        'isDate': true
      },
      {
        'name': 'enddate',
        'displayName': 'End Date',
        'disableSorting': false,
        'isDate': true

      },
      {
        'name': 'maxenddate',
        'displayName': 'Max End Date',
        'disableSorting': false,
        'isDate': true

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
    this.http.get(`/subscription/list/createdAt/-1/${this.tablePaginationSettings.pageIndex}/${this.tablePaginationSettings.pageSize}?`).subscribe(
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
      const dialogRef = this.dialog.open(AddSubscriptionModalComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'New Subscription Added',
              text: `Congratulations! You've just added a new subscription.`,
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
      const dialogRef = this.dialog.open(AddSubscriptionModalComponent, {
        data: { id:rowId },

      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Subscription Edited',
              text: `Subscription edited successfully`,
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
      const dialogRef = this.dialog.open(AddSubscriptionModalComponent, {
        data: { 
          id:rowId,
          isReadonly: true
         },
        width: '60%',
      });
    }
  }
  openPlaninfo(planinfo: any) {
    let rowId = planinfo.planid;
    const dialogRef = this.dialog.open(AddPlanModalComponent, {
      data: { id: rowId, isInfoscreen: true },
      width: '60%',
    });
  }
  openCusInfo(cusInfo: any) {
    let rowId = cusInfo.customer_id;
    const dialogRef = this.dialog.open(AddCustomerModalComponent, {
      data: { id: rowId, isInfoscreen: true },
      width: '60%'
    });
  }
}
