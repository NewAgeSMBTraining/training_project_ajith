import { Injectable } from '@angular/core';
import { NbDialogConfig, NbDialogRef, NbDialogService } from '@nebular/theme';
import { DialogComponent } from '../shared_components/dialog/dialog.component';
import { DialogData, DialogResponse } from '../model/dialog.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DailogService {
  config = new NbDialogConfig({
    closeOnBackdropClick: false,
    autoFocus: true,
    hasBackdrop: true,
  })
  constructor(private dailogservice:NbDialogService) { }
  open(data?: DialogData): Observable<DialogResponse> {
    // $('.cdk-overlay-container .cdk-overlay-backdrop').remove();
    // $('.cdk-overlay-container .cdk-global-overlay-wrapper').remove();
    return this.dailogservice.open(DialogComponent, {
      ...this.config,
      context: {
        data: JSON.stringify(data)
      }
    }).onClose;
  }


  openRef(ref: any, data?: any): NbDialogRef<unknown> {
    return this.dailogservice.open(ref, {
      ...this.config,
      context: {
        data: JSON.stringify(data)
      }
    });
  }
}
