import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpserviceService } from "../../../admin-shared/http/httpservice.service";
@Component({
  selector: 'app-add-newsletter-modal',
  templateUrl: './add-newsletter-modal.component.html',
  styleUrls: ['./add-newsletter-modal.component.sass']
})
export class AddNewsletterModalComponent implements OnInit {
  addnewsletterForm: FormGroup;
  newsletterId: any;
  isEditMode: boolean = false;
  readonly: boolean;
  constructor(private fb: FormBuilder, private http: HttpserviceService,
    public dialogRef: MatDialogRef<AddNewsletterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData?: any) { }
  ngOnInit(): void {
    this.addnewsletterForm = this.fb.group({
      email: ['', Validators.required],
      emailvalidated: ['', Validators.required],
      optedout: ['', Validators.required],
      is_customer: ['', Validators.required],
      is_lead: ['', Validators.required],
    })
    if (this.inputData && this.inputData !== null) {
      this.newsletterId = this.inputData.id;
      this.isEditMode = true;
      // console.log(this.InputID);
      this.getData();
    }
    if(this.inputData.isReadonly){
      this.readonly = true;
      this.addnewsletterForm.disable();
    }
  }
  getData() {
    this.http.get(`/newsletter/${this.newsletterId}`).subscribe(
      (res)=>{
        if(res.status == 1){
          let newslettedData = res.data;
          this.addnewsletterForm.patchValue({email: newslettedData.email, emailvalidated: newslettedData.emailvalidated,optedout: newslettedData.optedout, is_customer: newslettedData.is_customer, is_lead: newslettedData.is_lead});
        }
      }
    )
  }
  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return
    }
    let data = form.value;
    if(this.newsletterId){
      data._id = this.newsletterId;
      this.http.patch('/newsletter', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
        }
      )
    }else{

      this.http.post('/newsletter', data).subscribe(
        (res) => {
          if (res.status == 1) {
            this.dialogRef.close(1);
          }
        }
      )
    }
  }
  editinfo(){
    this.addnewsletterForm.enable()
    this.isEditMode = true;
    this.readonly = false;
  }
}
