import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ColumnSettingsModel, TablePaginationSettingsModel } from '../../../admin-shared/custom-table/table-settings.model';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsletterModalComponent } from '../../../admin-shared/dialogue/add-newsletter-modal/add-newsletter-modal.component';
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
        'name': 'email',
        'displayName': 'Email',
        'disableSorting': false,
      },
      {
        'name': 'emailvalidated',
        'displayName': 'Email Validated',
        'disableSorting': false,
        'isBooleanValue': true
      },
      {
        'name': 'optedout',
        'displayName': 'Opted Out',
        'disableSorting': false,
        'isBooleanValue': true
      },
      {
        'name': 'is_customer',
        'displayName': 'Is Customer',
        'disableSorting': false,
        'isBooleanValue': true
      },
      {
        'name': 'is_lead',
        'displayName': 'Is Lead',
        'disableSorting': false,
        'isBooleanValue': true
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
    this.http.get(`/newsletter/active/createdAt/-1/${this.tablePaginationSettings.pageIndex}/${this.tablePaginationSettings.pageSize}?`).subscribe(
      (results) => {
        console.log(results, 'leadlist');
        this.rowData = results.data.list;
        this.tablePaginationSettings.totalElements = results.data.pagination.total;
      }
    )
    // this.rowData=[
    //   {email:'test@email.com', email_validated:'NO',opted_out:'No'}
    // ]
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
      const dialogRef = this.dialog.open(AddNewsletterModalComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'New Lead Added',
              text: `Congratulations! NewsLetter added Successfully`,
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
      const dialogRef = this.dialog.open(AddNewsletterModalComponent, {
        data: { id:rowId }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Newsletter Edited',
              text: `Newsletter edited successfully`,
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
          collectionName: 'newsletter'
         }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Newsletter deleted',
              text: `Newsletter deleted successfully`,
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
      const dialogRef = this.dialog.open(AddNewsletterModalComponent, {
        data: { 
          id:rowId,
          isReadonly: true
         },
        width: '60%',
      });
    }
  }
}
