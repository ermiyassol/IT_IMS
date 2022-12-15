import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  display(type: string, message: string): void { // ? type - "success" | "error" | "warning"
    this.message.create(type, message);
  }

  constructor(private message: NzMessageService) {}
}
