import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpserviceService } from '../../http/httpservice.service';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.sass']
})
export class DeleteConfirmModalComponent implements OnInit {
  id: any;

  constructor(
    private http: HttpserviceService,
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) {
    if (data) {
      this.id = data.rowId;
    }
  }

  ngOnInit(): void {
  }
  Ondelete(){
    let data = {
      collection: '',
      ids: [] as any
    }
    data.collection = this.data.collectionName;
    data.ids.push(this.id)
    this.http.patch('/common/delete', data).subscribe(
      (res)=>{
        if(res.status ==1 ){
          this.dialogRef.close(1);
        } 
      }
    )
  }
}
