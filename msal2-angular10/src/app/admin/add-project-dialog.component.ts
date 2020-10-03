import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-add-project-dialog',
    templateUrl: 'add-project-dialog.component.html'
})

export class AddProjectDialogComponent implements OnInit {
    error: string;
    constructor(public _dialogRef: MatDialogRef<AddProjectDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }

    cancel() {
        this._dialogRef.close();
    }

    add() {
        if (this.data.name) { this._dialogRef.close(this.data.name); }
        else { this.error = "Please enter a name for the project." };
    }
}