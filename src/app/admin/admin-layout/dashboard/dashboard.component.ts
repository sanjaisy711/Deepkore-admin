import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../admin-shared/guard/auth.service";
import { Router } from "@angular/router";

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {


  barchartdata: any;
  piechartdata: any;
  dounutchartdata: any;
  linechartData: any;

  subscription: Subscription;

  // config: AppConfig;
  constructor(private auth: AuthService, private _Router: Router) {
    this.barchartdata = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

      datasets: [
        {
          label: 'Audience Map Location',
          backgroundColor: '#42A5F5',
          borderColor: '#F5F5F5',
          data: [65, 59, 80, 81, 56, 55, 40],
          barThickness: 8,
          borderRadius: '10',
        },
      ],
      options: {
        legend: {
          display: false,
        },
        scaleShowVerticalLines: false,
        // scales: {
        //   x: {
        //     grid: {
        //       display: false
        //     }
        //   },
        //   y: {
        //     grid: {
        //       display: false
        //     }
        //   },
        // } 

      },

    };
    this.piechartdata = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        },

      ],
      legend: {
        display: true,
        position: 'bottom',
        text: 'test'
      }
    };
    this.dounutchartdata = {
      
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ],

    };
    this.linechartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: .4,
          borderColor: '#42A5F5'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: .4,
          borderColor: '#66BB6A'
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: .4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

  }

  ngOnInit(): void {

  }

}
