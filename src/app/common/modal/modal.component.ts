import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modal } from '../modal.model';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {
public myDialogData;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private dialogService: DialogService,
              @Optional() @Inject(MAT_DIALOG_DATA)
              public data?: any) { }

  ngOnInit(): void {
    this.myDialogData = this.dialogRef.componentInstance.data;
  }

  save(){
    this.dialogService.emitDialogEvent('save');
  }

  close() {
    this.dialogRef.close();
  }

}
