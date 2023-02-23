import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { AuthService } from '../home/service/auth.service';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  isLoading = false;
  user: any = {};

  logout() {
    // console.log("Logout clicked main");
    this.authService.logout().then(() => {
      this.routes.navigate(['auth']);
    });
  }

  constructor(private subjectService: SubjectsService, private mainService: MainService, private routes: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.subjectService.collapseEvent.subscribe(response => {
      this.isCollapsed = response;
    })

    const session = this.mainService.getSession();
    if(session.status) {
      this.user = session.user;
      this.mainService.loadData().then(() => {
        this.isLoading = false;
      })
    } else {
      this.routes.navigate(['auth']);
    }
  }
}