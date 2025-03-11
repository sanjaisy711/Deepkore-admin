import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
@Component({
  selector: 'app-add-subscription-modal',
  templateUrl: './add-subscription-modal.component.html',
  styleUrls: ['./add-subscription-modal.component.sass']
})
export class AddSubscriptionModalComponent implements OnInit {
  addsubscriptionForm: FormGroup;
  subscriptionId: any;
  isEditMode: boolean = false;
  planList: any;
  leadList: any;
  readonly: boolean;
  constructor(private fb: FormBuilder, private http: HttpserviceService,
    public dialogRef: MatDialogRef<AddSubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public inputdata?: any) { }
  ngOnInit(): void {
    this.addsubscriptionForm = this.fb.group({
      planid: ['', Validators.required],
      lead_id: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      maxenddate: ['', Validators.required],
    })
    if (this.inputdata && this.inputdata !== null) {
      this.subscriptionId = this.inputdata.id;
      this.isEditMode = true;
      // console.log(this.InputID);
      this.getData();
    }
    if(this.inputdata?.isReadonly){
      this.readonly = true;
      this.addsubscriptionForm.disable();
    }
    this.getPlans();
    this.getLeads();
  }
  getData() {
    this.http.get(`/subscription/${this.subscriptionId}`).subscribe(
      (res)=>{
        if(res.status == 1){
          let subscriptionData = res.data;
          this.addsubscriptionForm.patchValue({planid: subscriptionData.planid, lead_id: subscriptionData.lead_id});
          let startdate = new Date(subscriptionData.startdate);
          this.addsubscriptionForm.get('startdate')?.setValue(startdate);
          let enddate = new Date(subscriptionData.enddate);
          this.addsubscriptionForm.get('enddate')?.setValue(enddate);
          let maxenddate = new Date(subscriptionData.maxenddate);
          this.addsubscriptionForm.get('maxenddate')?.setValue(maxenddate);
        }
      }
    )
  }
  getPlans() {
    this.http.get('/plan/all/active/trial').subscribe(
      (res) => {
        if (res.status == 1) {
          this.planList = res.data;
        }
      }
    )
  }
  getLeads() {
    this.http.get('/lead/all/active').subscribe(
      (res) => {
        if (res.status == 1) {
          this.leadList = res.data;
        }
      }
    )
  }
  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return
    }
    let data = form.value;
    if (this.subscriptionId) {
      data._id = this.subscriptionId;
      this.http.patch('/subscription', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
        }
      )
    } else {
      this.http.post('/subscription', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
        }
      )
    }
  }
  editinfo(){
    this.addsubscriptionForm.enable()
    this.isEditMode = true;
    this.readonly = false;
  }
  calculatedays(event: any) {
    let planId = event.target.value;
    let currentPlan = this.planList.filter((x:any)=> x._id == planId);
    let today = new Date();
    let calcDate = today.setDate(today.getDate() + currentPlan[0].dayscount);
    let subscriptionValidityDate = new Date(calcDate);
    let onBoarddate = new Date();
    this.addsubscriptionForm.get('startdate')?.setValue(onBoarddate);
    this.addsubscriptionForm.get('enddate')?.setValue(subscriptionValidityDate);
    
  }
  calcdates(event: any){
    let onboard = event.target.value;
    let planId = this.addsubscriptionForm.get('planid')?.value;
    let currentplan = this.planList.filter((x:any)=>x._id == planId)
    let newvalDate = onboard.setDate(onboard.getDate() + currentplan[0].dayscount);
    let newsubValDate = new Date(newvalDate);
    this.addsubscriptionForm.get('enddate')?.setValue(newsubValDate);

  }
  test(){
    
  }
}
