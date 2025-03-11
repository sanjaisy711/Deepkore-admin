import { Component, OnInit } from '@angular/core';
import { AuthService } from "../guard/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  dashboardIcon: boolean = true;
  leadIcon: boolean;
  customerIcon: boolean;
  planIcon: boolean;
  subscriptionIcon: boolean;
  newsletterIcon: boolean;
  constructor(private auth: AuthService, private _Router: Router, private activatedRoute: ActivatedRoute) {
    let routeURL = this._Router.url.split('/');
    let currentUrl = routeURL[2];
    console.log(currentUrl, 'currentUrl');
  }

  ngOnInit(): void {

  }
  ngonChanges() {

  }
  logout() {
    this.auth.signOut();
    this._Router.navigate(['/sign-in']);
  }
  addClass(event: any, key: string) {
    let classlist = document.getElementsByTagName('li');
    // for (let index = 0; index < classlist.length; index++) {
    //   const element = classlist[index];
    //   element.classList.remove('activeli');
    // }
    // event.target.classList.add('activeli');
    switch (key) {
      case 'dashboard':
        this.dashboardIcon = true;
        this.leadIcon = false;
        this.customerIcon = false;
        this.planIcon = false;
        this.subscriptionIcon = false;
        this.newsletterIcon = false;
        break;
      case 'lead':
        this.dashboardIcon = false;
        this.leadIcon = true;
        this.customerIcon = false;
        this.planIcon = false;
        this.subscriptionIcon = false;
        this.newsletterIcon = false;
        break;
      case 'customer':
        this.dashboardIcon = false;
        this.leadIcon = false;
        this.customerIcon = true;
        this.planIcon = false;
        this.subscriptionIcon = false;
        this.newsletterIcon = false;
        break;
      case 'plan':
        this.dashboardIcon = false;
        this.leadIcon = false;
        this.customerIcon = false;
        this.planIcon = true;
        this.subscriptionIcon = false;
        this.newsletterIcon = false;
        break;
      case 'subscription':
        this.dashboardIcon = false;
        this.leadIcon = false;
        this.customerIcon = false;
        this.planIcon = false;
        this.subscriptionIcon = true;
        this.newsletterIcon = false;
        break;
      case 'news':
        this.dashboardIcon = false;
        this.leadIcon = false;
        this.customerIcon = false;
        this.planIcon = false;
        this.subscriptionIcon = false;
        this.newsletterIcon = true;
        break;
      default:
        break;
    }
  }

}
