import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isCollapsed = false;
  deviceMenu = true;
  role = "";

  constructor(private subjectService: SubjectsService, private STORE: StoreService) { }

  ngOnInit() {
    this.role = this.STORE.getRoles();
    this.subjectService.collapseEvent.subscribe(response => {
      this.isCollapsed = response;
    })
  }

}
