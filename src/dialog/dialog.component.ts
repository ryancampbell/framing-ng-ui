import { Component, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { DialogFrame } from './index';

@Component({
  template: '<div></div>',
})
export class DialogComponent implements OnDestroy {

  private dialogRef: MdDialogRef<any>;

  constructor(
    private frame: DialogFrame,
    private dialog: MdDialog,
  ) {
    this.openDialog();
  }

  public ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private openDialog(): void {
    this.dialogRef = this.dialog.open(this.frame.config.component, { disableClose: true });
  }
}
