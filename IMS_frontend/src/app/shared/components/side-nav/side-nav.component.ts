import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isCollapsed = false;
  deviceMenu = true;

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
    this.subjectService.collapseEvent.subscribe(response => {
      this.isCollapsed = response;
    })
  }

}
