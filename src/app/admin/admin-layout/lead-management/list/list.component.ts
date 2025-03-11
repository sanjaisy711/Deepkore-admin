import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ColumnSettingsModel, TablePaginationSettingsModel } from '../../../admin-shared/custom-table/table-settings.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../../../admin-shared/dialogue/add-user-modal/add-user-modal.component';
import { PopupBoxComponent } from "../../../admin-shared/dialogue/popup-box/popup-box.component";
import { StatusUpdateModalComponent } from "../../../admin-shared/dialogue/status-update-modal/status-update-modal.component";
import { DeleteConfirmModalComponent } from '../../../admin-shared/dialogue/delete-confirm-modal/delete-confirm-modal.component';

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
        'name': 'name',
        'displayName': 'Name',
        'disableSorting': false,
      },
      {
        'name': 'business_email',
        'displayName': 'Email address',
        'disableSorting': false,

      },
      {
        'name': 'mobile',
        'displayName': 'Phone',
        'disableSorting': false,
      },
      {
        'name': 'source',
        'displayName': 'Source',
        'disableSorting': false,
      },
      {
        'name': 'status',
        'displayName': 'Status',
        'disableSorting': false,
      },
      {
        'name': 'action',
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
    this.http.get(`/lead/list/createdAt/-1/${this.tablePaginationSettings.pageIndex}/${this.tablePaginationSettings.pageSize}?`).subscribe(
      (results) => {
        console.log(results, 'leadlist');
        this.rowData = results.data.list;
        this.tablePaginationSettings.totalElements = results.data.pagination.total;
      }
    )
  }
  // sendinvite(id: any){
  //   let data ={
  //     id: id
  //   }
  //   // this.http.post('/lead/invite', data).subscribe(
  //   //   (results)=>{
  //   //     // console.log('activated');
  //   //     if(results.status == 1){
  //   //       let token = results.data.split('?');
  //   //       console.log(token[1]);
  //   //       // this.router.navigateByUrl(results.data);
  //   //       window.open(`${environment.panelUrl}/panel${results.data}`)
  //   //     }
  //   //   }
  //   // )
  //   this.http.get('lead/all/createdAt/-1/1/10?').subscribe(
  //   (res)=>{
  //     this.rowData = res.data.list;
  //   }
  //   )
  // }
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
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'New Lead Added',
              text: `Congratulations! You've just added a new lead to your pipeline. Keep track of their progress with them in the 'Leads' section of your dashboard`,
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
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        data: { 
          id:rowId
         },
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Lead Edited',
              text: `Lead edited successfully`,
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
          collectionName: 'lead'
         },
         
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result == 1){
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Lead deleted',
              text: `Lead deleted successfully`,
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
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        data: { 
          id:rowId,
          isReadonly: true
         },
        width: '60%',
      });
    }
  }
  openStatusUpdateModal(id: any) {
    const statusmodal = this.dialog.open(StatusUpdateModalComponent, {
      data:{
        rowid: id
      },
      width: '60%'
    });
    statusmodal.afterClosed().subscribe(
      (res)=>{
        if(res == 1){
          this.initData();
          const successdialogue = this.dialog.open(PopupBoxComponent, {
            data: {
              title: 'Status Updated',
              text: `Lead status updated successfully`,
              Btn: 'Okay',
              isSuccess: true,
              showOnly: true
            },
            width: '35%',
          });
          successdialogue.afterClosed().subscribe(result => {
          });
        }
      }
    )
  }
}
