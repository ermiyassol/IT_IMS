import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  tabs: any[] = [];

  tabClickListener(title: string) {
    if(title == "general") {
      this.routes.navigate(["main", "dashboard"]);
    } else {
      this.routes.navigate(["main", "dashboard", "specific", title]);
    }
  }

  constructor(private dashboardService: DashboardService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tabs = this.dashboardService.getAllDeviceType();
    this.tabs.unshift("general");
  }
}
