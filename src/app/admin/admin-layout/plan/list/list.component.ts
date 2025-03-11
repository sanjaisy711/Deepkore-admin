import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ColumnSettingsModel, TablePaginationSettingsModel } from '../../../admin-shared/custom-table/table-settings.model';
import { MatDialog } from '@angular/material/dialog';
import { AddPlanModalComponent } from '../../../admin-shared/dialogue/add-plan-modal/add-plan-modal.component';
import { PopupBoxComponent } from "../../../admin-shared/dialogue/popup-box/popup-box.component";
import { DeleteConfirmModalComponent } from 'src/app/admin/admin-shared/dialogue/delete-confirm-modal/delete-confirm-modal.component';

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
        'name': 'planname',
        'displayName': 'Plan Name',
        'disableSorting': false,
      },
      {
        'name': 'usercount',
        'displayName': 'User Count',
        'disableSorting': false,

      },
      {
        'name': 'dayscount',
        'displayName': 'Days Count',
        'disableSorting': false,
      },
      {
        'name': 'remainder1',
        'displayName': 'Reminder 1',
        'disableSorting': false,
      },
      {
        'name': 'remainder2',
        'displayName': 'Reminder 2',
        'disableSorting': false,
      },
      {
        'name': 'plantypename',
        'displayName': 'Plan Type',
        'disableSorting': false,
      },
      {
        'name': 'price',
        'displayName': 'Price',
        'disableSorting': false,
      },
      {
        'name': 'actiontwo',
        'displayName': 'Action',
        'disableSorting': false,
        'isAction': 1
      },
    ];
  }

  ngOnInit(): void {
    this.initData();

  }
  initData() {
    this.http.get(`/plan/active/createdAt/-1/${this.tablePaginationSettings.pageIndex}/${this.tablePaginationSettings.pageSize}?`).subscribe(
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
      const dialogRef = this.dialog.open(AddPlanModalComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'New Plan Added',
              text: `Congratulations! You've just added a new Plan.`,
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
      const dialogRef = this.dialog.open(AddPlanModalComponent, {
        data: { id:rowId },
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Plan Edited',
              text: `Plan editted successfully`, 
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
    else if (event.method == 'delete'){
      let rowId = event.id;
      const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
        data: { 
          rowId : event.id,
          dialogueTitle: 'Are you sure to Delete?',
          CloseBtn: 'Cancel',
          confirmBtn: 'Delete',
          collectionName: 'plan'
         }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Plan deleted',
              text: `Plan deleted successfully`,
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
      const dialogRef = this.dialog.open(AddPlanModalComponent, {
        data: { 
          id:rowId,
          isReadonly: true
         },
        width: '60%',
      });
    }
  }

}
