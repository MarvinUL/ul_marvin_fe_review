import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public dialogSubject = new Subject<string>();
  dialogObservable$ = this.dialogSubject.asObservable();

  emitDialogEvent(event: string){
    this.dialogSubject.next(event);
  }
}
