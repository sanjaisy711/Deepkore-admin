import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpserviceService } from '../../http/httpservice.service';

@Component({
  selector: 'app-status-update-modal',
  templateUrl: './status-update-modal.component.html',
  styleUrls: ['./status-update-modal.component.sass']
})
export class StatusUpdateModalComponent implements OnInit {
  leadid: any;
  statusform: FormGroup;
  statusData: any;
  statusHeader: any;
  statusList: any;
  leadstatusRecord: any;
  dzitraUserList: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpserviceService,
    public dialogRef: MatDialogRef<StatusUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    if (data) {
      this.leadid = data.rowid;
    }
  }

  ngOnInit(): void {
    this.statusform = this.fb.group({
      leadstatus_id: ['', Validators.required],
      updateddate: [''],
      comments: [''],
      dzitrauser_id: ['', Validators.required],
    });
    let today = new Date()
    this.statusform.get('updateddate')?.setValue(today);
    this.getstatuslist();
    this.getleadstatus();
    this.getDzitrUsers();
    this.getleadData()
  }
  getstatuslist() {
    this.http.get('/leadstatus/all/active').subscribe(
      (res) => {
        if (res.status == 1) {
          this.statusList = res.data;
        }
      }
    )
  }
  getleadData(){
    this.http.get(`/lead/${this.leadid}`).subscribe(
      (res)=>{
        if(res.status == 1){
          let leaddata = res.data;
          this.statusform.get('leadstatus_id')?.setValue(leaddata.leadstatus_id ? leaddata.leadstatus_id  : '63f6125ac44a8bbb59c4ead4');
          this.statusform.get('dzitrauser_id')?.setValue(leaddata.dzitrauser_id)

        }
      }
    )
  }
  getleadstatus() {
    this.http.get(`/lead/status/${this.leadid}`).subscribe(
      (res) => {
        if (res.status == 1) {   
          this.leadstatusRecord = res.data;          
          this.statusHeader = [{ name: 'Serial No', key: 'serialno' }, { name: 'Status', key: 'leadstatus_id' }, { name: 'Date', key: 'updateddate' }, { name: 'Comments', key: 'comments' }]
          this.statusData = this.leadstatusRecord;          
        }
      }
    )
  }
  getDzitrUsers() {
    this.http.get('/dzitrauser/all/active').subscribe(
      (res) => {
        if (res.status == 1) {
          this.dzitraUserList = res.data;
        }
      }
    )
  }
  getleadname(id: any){
    let leadname = this.statusList.filter((x: any)=>x._id == id);
    return leadname[0]?.name;
  }
  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return
    }
    let data = form.value;
    data.lead_id = this.leadid;
    const len = this.leadstatusRecord.length - 1;
    // console.log(len);
    // console.log(this.leadstatusRecord[len].leadstatus_id);
    const leadStatusId = this.leadstatusRecord?.[len]?.leadstatus_id;
    console.log(leadStatusId);
    data.oldleadstatus_id = leadStatusId ?? `6737277c31e27fe6384c5a2c`;
    console.log(data.oldleadstatus_id);
    this.http.post('/lead/updatestatus', data).subscribe(
      (res) => {
        if (res.status == 1) {
          this.dialogRef.close(1);
        }
      }
    )

  }

}
