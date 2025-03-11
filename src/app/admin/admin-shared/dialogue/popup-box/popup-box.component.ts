import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-box',
  templateUrl: './popup-box.component.html',
  styleUrls: ['./popup-box.component.sass']
})
export class PopupBoxComponent implements OnInit {
  dialoguedata: any;
  constructor(public dialogRef: MatDialogRef<PopupBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { 
      if(data){
        this.dialoguedata = data;
      }
    }

  ngOnInit(): void {
  }
  positivBtnClick(){
    this.dialogRef.close(1);
  }
}
