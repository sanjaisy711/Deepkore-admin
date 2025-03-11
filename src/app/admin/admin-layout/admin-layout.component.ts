import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass']
})
export class AdminLayoutComponent implements OnInit {
  isWebDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(window.innerWidth, 'window.innerWidth');
    if (window.innerWidth && window.innerWidth > 601) {
      this.isWebDisplay = true;
    } else {
      this.isWebDisplay = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth && window.innerWidth > 601) {
      this.isWebDisplay = true;
    } else {
      this.isWebDisplay = false;
    }
  }
}
