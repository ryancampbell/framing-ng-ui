import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { DialogFrame } from './dialog.frame';

@Component({
  template: '<div></div>',
})
export class DialogComponent implements OnInit, OnDestroy {

  public dialogRef: MdDialogRef<any>;

  constructor(
    public dialogFrame: DialogFrame,
    public dialog: MdDialog,
  ) {}

  public ngOnInit(): void {
    this.openDialog();
  }

  public ngOnDestroy(): void {
    this.closeDialog();
  }

  private openDialog(): void {
    this.dialogRef = this.dialog.open(
      this.dialogFrame.config.component,
      this.dialogFrame.config.dialogConfig,
    );
  }

  private closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
