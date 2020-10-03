import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: 'delete-dialog.component.html'
})

export class DeleteDialogComponent implements OnInit {
    confirmationMessage: string;
    constructor(public _dialogRef: MatDialogRef<DeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { 
                    this.confirmationMessage = data.message;
                }

    ngOnInit() { }

    cancel() {
        this._dialogRef.close();
    }
}