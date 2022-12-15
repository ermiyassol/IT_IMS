import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/shared/services/subjects.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isCollapsed = false;

  constructor(private subjectService: SubjectsService) { }

  ngOnInit() {
    this.subjectService.collapseEvent.subscribe(response => {
      this.isCollapsed = response;
    })
  }

}
