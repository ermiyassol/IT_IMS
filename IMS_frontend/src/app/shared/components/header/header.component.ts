import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;

  changeView() {
    this.isCollapsed = !this.isCollapsed;
    this.subjectService.collapseEvent.next(!this.isCollapsed);
  }


  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
  }

}
