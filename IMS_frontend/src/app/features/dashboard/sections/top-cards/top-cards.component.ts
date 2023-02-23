import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  styleUrls: ['./top-cards.component.scss']
})
export class TopCardsComponent implements OnInit {
  totalDeviceStat: any[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.fetchTotalDeviceStat().then((response: any) => {
      this.totalDeviceStat = response;
    })
  }

}
