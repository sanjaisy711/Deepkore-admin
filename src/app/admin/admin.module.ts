import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSharedModule } from "./admin-shared/shared.module";
import { SignInComponent} from "./sign-in/sign-in.component";
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminLayoutModule } from "./admin-layout/admin-layout.module";
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpinterceptorsadminService } from "./admin-shared/interceptors/httpinterceptors.service";
@NgModule({
  declarations: [
    SignInComponent,
    AdminComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    AdminLayoutModule
  ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: HttpinterceptorsadminService,
//       multi: true
//   },
// ]
})
export class AdminModule { }
