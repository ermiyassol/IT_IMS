import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../model/device.model';
import { DeviceService } from '../../service/device.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  totalPage = 100;
  currentPage = 1;
  pageSize = 10;
  devices: any[] = [];
  isLoading = false;
  searchKey = "";

  viewDetail(deviceId: string) {
    this.routes.navigate([`./${deviceId}/detail`], {relativeTo: this.route})
  }
  
  constructor(private route: ActivatedRoute, private routes: Router, private deviceService: DeviceService) { }

  ngOnInit() {
    this.isLoading = true;
    this.deviceService.fetchAll().then((response: any[]) => {
      this.devices = response;
      this.isLoading = false;
    })
  }
}
