import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MilestoneStatus } from '../model/milestone-status';

@Component({
  selector: 'app-add-edit-milestone-dialog',
  templateUrl: 'add-edit-milestone-dialog.component.html'
})
export class AddEditMilestoneDialogComponent implements OnInit {
  error: string;
  status: MilestoneStatus;

  constructor(
    public _dialogRef: MatDialogRef<AddEditMilestoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.status = data.defaultStatus;
  }

  ngOnInit() {}

  cancel() {
    this._dialogRef.close();
  }

  addEdit() {
    if (this.data.milestone.name && this.status) {
      this.data.milestone.milestoneStatusId = this.status.id;
      this._dialogRef.close(this.data.milestone);
    } else {
      this.error = 'Please enter a name and status for the milestone.';
    }
  }
}
