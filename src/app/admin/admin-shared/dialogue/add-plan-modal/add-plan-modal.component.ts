import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";

@Component({
  selector: 'app-add-plan-modal',
  templateUrl: './add-plan-modal.component.html',
  styleUrls: ['./add-plan-modal.component.sass']
})
export class AddPlanModalComponent implements OnInit {
  addplanForm: FormGroup;
  planId: any;
  isEditMode: boolean = false;
  PlanTypes: any;
  readOnly: boolean = false;
  isInfoOnly: boolean = false;
  sumInsuredLimitModel:number;
  value = '0';
  limit=0;
  amountPrecisionOptions = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    decimal: '.',
    precision: 2,
    prefix: '',
    suffix: '',
    hundreds: '.'
};
  constructor(private fb: FormBuilder, private http: HttpserviceService, 
    public dialogRef: MatDialogRef<AddPlanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData?: any) { }

  ngOnInit(): void {
    this.addplanForm = this.fb.group({
      planname: ['', Validators.required],
      usercount: ['', Validators.required],
      dayscount: ['', Validators.required],
      remainder1: ['', Validators.required],
      remainder2: ['', Validators.required],
      plantypeid: ['', Validators.required],
      price: ['', Validators.required],
      internal_name: ['', Validators.required],

    })
    if(this.inputData && this.inputData.id !== null){
      this.planId = this.inputData.id;
      this.isEditMode = true;
      // console.log(this.InputID);
      this.getData();
    }
    if(this.inputData?.isReadonly){
      this.readOnly = true;
      this.addplanForm.disable()
    }
    if(this.inputData?.isInfoscreen){
      this.isInfoOnly = true;
      this.addplanForm.disable()
    }
    this.getPlanType();

  }
  getPlanType(){
    this.http.get('/plantype/all/active').subscribe(
      (res)=>{
        if(res.status == 1){
          this.PlanTypes = res.data
        }
      }
    )
  }
  getData(){
    this.http.get(`/plan/${this.planId}`).subscribe(
      (res)=>{
        if(res.status == 1){
          let plandata = res.data;
          this.addplanForm.patchValue({planname: plandata.planname, usercount: plandata.usercount,dayscount: plandata.dayscount, remainder1: plandata.remainder1,remainder2: plandata.remainder2, plantypeid: plandata.plantypeid, price: plandata.price, internal_name: plandata.internal_name});
        }
      }
    )
  }
  onSubmit(form: FormGroup){
    if(!form.valid){
      return
    }
    let data = form.value;
    // this.dialogRef.close(1);
    if(this.planId){
      data._id = this.planId;
      this.http.patch('/plan', data).subscribe(
        (res)=>{
          if(res.status == 1){
            this.dialogRef.close(1);
          }
        }
      )
    }else{
      this.http.post('/plan', data).subscribe(
        (res)=>{
          if(res.status == 1){
            this.dialogRef.close(1);
          }
        }
      )
    }
  }
  editinfo(){
    this.addplanForm.enable()
    this.isEditMode = true;
    this.readOnly = false;
  }
}
