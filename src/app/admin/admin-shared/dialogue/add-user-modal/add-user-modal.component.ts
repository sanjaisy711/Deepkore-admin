import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.sass']
})
export class AddUserModalComponent implements OnInit {
  addLeadForm: FormGroup;
  leadId: any;
  isEditMode: boolean = false;
  isWebMode: boolean = false;
  industryList: any;
  readOnly: boolean = false;
  isInfoOnly: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpserviceService, 
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData?: any) { }

  ngOnInit(): void {
  
    this.addLeadForm = this.fb.group({
      name: ['', Validators.required],
      industry_id: [''],
      business_email: ['', Validators.required],
      country: ['', Validators.required],
      mobile: ['', Validators.required],
      company_name: [''],
      company_size: [''],
      brief_business_requirement: [''],
      source: [''],

    })
    if(this.inputData && this.inputData.id !== null){
      this.leadId = this.inputData.id;
      this.isEditMode = true;
      // console.log(this.InputID);
      this.getData();
    }
    if(this.inputData?.isReadonly){
      this.readOnly = true;
      this.addLeadForm.disable()
    }
    if(this.inputData?.isInfoscreen){
      this.isInfoOnly = true;
      this.addLeadForm.disable()
    }
    if(window.innerWidth > 600){
      this.isWebMode = true
    }else{
      this.isWebMode = false
    }
    this.getIndustry();
    this.addLeadForm.get('country')?.setValue('IN')
  }
  getIndustry(){
    this.http.get('/industrytype/all/active').subscribe(
      (res)=>{
        if(res.status == 1){
          this.industryList = res.data;          
        }
      }
    )
  }
  getData(){
    this.http.get(`/lead/${this.leadId}`).subscribe(
      (res)=>{
        if(res.status == 1){
          let leaddata = res.data;
          this.addLeadForm.patchValue({name: leaddata.name, industry_id: leaddata.industry_id,business_email: leaddata.business_email, country: leaddata.country,mobile: leaddata.mobile, company_name: leaddata.company_name, company_size: leaddata.company_size,brief_business_requirement: leaddata.brief_business_requirement, source: leaddata.source });
        }
      }
    )
  }
  onSubmit(form: FormGroup){
    if(!form.valid){
      return
    }
    let data = form.value;
    data.company_size = +data.company_size;

    if(this.leadId){
      data._id = this.leadId;
      this.http.patch('/lead', data).subscribe(
        (res)=>{
          if(res.status == 1){
            this.dialogRef.close(1);
          }
        }
      )
    }else{
      this.http.post('/lead', data).subscribe(
        (res)=>{
          if(res.status == 1){
            this.dialogRef.close(1);
          }
        }
      )
    }
  }
  editinfo(){
    this.addLeadForm.enable()
    this.isEditMode = true;
    this.readOnly = false;
  }
}
export interface DialogData {
  status: number,
  data: any
}
