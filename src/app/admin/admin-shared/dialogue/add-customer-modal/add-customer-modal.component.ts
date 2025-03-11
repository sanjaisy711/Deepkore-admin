import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
import { PopupBoxComponent } from '../popup-box/popup-box.component';
@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.sass']
})
export class AddCustomerModalComponent implements OnInit {
  addcustomerForm: FormGroup;
  cusId: any;
  isEditMode: boolean = false;
  leadList: any;
  planList: any;
  dzitraUserList: any;
  readOnly: boolean;
  isInfoOnly: boolean = false;

  constructor(private fb: FormBuilder, private dialog:MatDialog, private http: HttpserviceService,
    public dialogRef: MatDialogRef<AddCustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public Inputdata?: any){ }
  ngOnInit(): void {

    this.addcustomerForm = this.fb.group({
      planid: ['', Validators.required],
      lead_id: ['', Validators.required],
      onboarded_date: ['', Validators.required],
      subscription_validity: ['', Validators.required],
      remind_before: ['', Validators.required],
      purchase_id: ['', Validators.required],
      dzitrauser_id: ['', Validators.required],
    })
    if (this.Inputdata && this.Inputdata.id !== null) {
      this.cusId = this.Inputdata.id;
      this.isEditMode = true;
      this.getData();
    }
    if(this.Inputdata?.isReadonly){
      this.readOnly = true;
      this.addcustomerForm.disable()
    }
    if(this.Inputdata?.isInfoscreen){
      this.isInfoOnly = true;
      this.addcustomerForm.disable()
    }
    this.getPlans();
    this.getLeads();
    this.getDzitrUsers();
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
  getPlans() {
    this.http.get('/plan/all/active/paid').subscribe(
      (res) => {
        if (res.status == 1) {
          this.planList = res.data;
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
  getData() {
    this.http.get(`/customer/${this.cusId}`).subscribe(
      (res) => {
        if (res.status == 1) {
          let customerData = res.data;
          this.addcustomerForm.patchValue({ lead_id: customerData.lead_id, planid: customerData.planid,  remind_before: customerData.remind_before, purchase_id: customerData.purchase_id, dzitrauser_id: customerData.dzitrauser_id });
         let onboardeddate = new Date(customerData.onboarded_date);
          let subscriptionvalidity = new Date(customerData.subscription_validity);
          this.addcustomerForm.get('onboarded_date')?.setValue(onboardeddate);
          this.addcustomerForm.get('subscription_validity')?.setValue(subscriptionvalidity);

        }
      }
    )
  }
  calculatedays(event: any) {
    let planId = event.target.value;
    let currentPlan = this.planList.filter((x:any)=> x._id == planId);
    let today = new Date();
    let calcDate = today.setDate(today.getDate() + currentPlan[0].dayscount);
    let subscriptionValidityDate = new Date(calcDate);
    let onBoarddate = new Date();
    this.addcustomerForm.get('onboarded_date')?.setValue(onBoarddate);
    this.addcustomerForm.get('subscription_validity')?.setValue(subscriptionValidityDate);
    
  }
  calcdates(event: any){
    let onboard = event.target.value;
    let planId = this.addcustomerForm.get('planid')?.value;
    let currentplan = this.planList.filter((x:any)=>x._id == planId)
    let newvalDate = onboard.setDate(onboard.getDate() + currentplan[0].dayscount);
    let newsubValDate = new Date(newvalDate);
    this.addcustomerForm.get('subscription_validity')?.setValue(newsubValDate);

  }
  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return
    }
    let data = form.value
    if (this.cusId) {
      data._id = this.cusId;
      this.http.patch('/customer', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
        }
      )
    } else {
      this.http.post('/customer', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
          else if(res.status == 2){
            const successdialogue = this.dialog.open(PopupBoxComponent, {
              data: {
                title: 'User Exists',
                text: `Are you sure to Sync User?`,
                positivebtn: 'Sync',
                Negativebtn: 'Cancel',
                actions: true,
                isSuccess: false,
                showOnly: false,
              },
              width: '35%',
            });
            successdialogue.afterClosed().subscribe((result: any) => {
              if(result == 1){
                let cusdata = form.value;
                cusdata.sync = true;
                this.http.post('/customer', cusdata).subscribe(
                  (res) => {
                    if (res.status == 1) {
                      this.dialogRef.close(1);
                    }
                  }
                )
              }
            });
          }
        }
      )
    }
  }
  editinfo(){
    this.addcustomerForm.enable()
    this.isEditMode = true;
    this.readOnly = false;
  }

}
