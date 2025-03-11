import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AuthGuard } from './admin/admin-shared/guard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/admin-layout/dashboard/dashboard.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
// import { SignUpComponent } from './client-app/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  // {
  //   path: 'sign-up',
  //   component: SignUpComponent,
  // },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./client-app/client-app.module').then(
  //       (module) => module.ClientAppModule
  //     ),
  // },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'lead-management',
        loadChildren: () =>
          import(
            '../app/admin/admin-layout/lead-management/lead-management.module'
          ).then((module) => module.LeadManagementModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../app/admin/admin-layout/customer/customer.module').then(
            (module) => module.CustomerModule
          ),
      },
      {
        path: 'plan',
        loadChildren: () =>
          import('../app/admin/admin-layout/plan/plan.module').then(
            (module) => module.PlanModule
          ),
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import(
            '../app/admin/admin-layout/subscription/subscription.module'
          ).then((module) => module.SubscriptionModule),
      },
      {
        path: 'newsletter',
        loadChildren: () =>
          import('../app/admin/admin-layout/newsletter/newsletter.module').then(
            (module) => module.NewsletterModule
          ),
      },
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// , {useHash: true}
