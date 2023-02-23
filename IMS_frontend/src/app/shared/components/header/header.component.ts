import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  @Input() user: any = {};
  @Output() logoutListener = new EventEmitter();

  changeView() {
    this.isCollapsed = !this.isCollapsed;
    this.subjectService.collapseEvent.next(!this.isCollapsed);
  }

  logout() {
    this.logoutListener.emit();
  }


  constructor(private subjectService: SubjectsService, ) { }

  ngOnInit() {
  }

}
