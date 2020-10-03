import { Component, OnInit, Inject } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from '../core/account.service';
import { ProjectService } from '../core/project.service';
import { UserPermission } from '../model/user-permission';
import { Utils } from '../core/utils';

@Component({
  selector: 'app-add-project-user-dialog',
  templateUrl: 'add-project-user-dialog.component.html'
})
export class AddProjectUserDialogComponent implements OnInit {
  allUsers: UserProfile[];
  unassociatedUsers: UserProfile[] = [];
  selectedUser: any;
  permission = 'View';
  projectId: number;
  error: string;

  constructor(
    private _accountService: AccountService,
    public _dialogRef: MatDialogRef<AddProjectUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _projectService: ProjectService
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit() {
    this,
      this._accountService.getAllUsers().subscribe(allUsers => {
        this.allUsers = allUsers;
        this._projectService
          .getProjectUsers(this.projectId)
          .subscribe(projectUsers => {
            this.allUsers.forEach(u => {
              const projectUser = projectUsers.find(pu => pu.id === u.id);
              if (!projectUser) { this.unassociatedUsers.push(u); }
            });
          });
      });
  }

  add() {
    if (!this.selectedUser) {
      this.error = 'You must select a user to add';
    } else {
      const perm = new UserPermission();
      perm.userProfileId = this.selectedUser.id;
      perm.value = this.permission;
      perm.projectId = this.projectId;
      this._projectService.addUserPermission(perm).subscribe(
        result => {
          this._dialogRef.close(true);
        },
        error => this.error = Utils.formatError(error)
      );
    }
  }

  cancel() {
    this._dialogRef.close();
  }

}
