import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
collapseEvent = new Subject<boolean>();
constructor() { }

}
