import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {DialogData, DialogResponse} from '../../model/dialog.model'

@Component({
  selector: 'app-dailog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() data: string = '';
  dialogData = new DialogData({});
  constructor(protected ref: NbDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    try {
      const d: DialogData = JSON.parse(this.data)
      this.dialogData = new DialogData(d);
    } catch (error) {

    }
  }

  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
  }
}