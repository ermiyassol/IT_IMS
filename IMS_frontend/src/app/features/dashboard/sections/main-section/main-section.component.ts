import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  tabs: any[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.tabs = this.dashboardService.getAllDeviceType();
  }

}
