import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { DeleteDialogComponent } from '../admin/delete-dialog.component';
import { AccountService } from '../core/account.service';
import { ProjectService } from '../core/project.service';
import { Utils } from '../core/utils';
import { Milestone } from '../model/milestone';
import { MilestoneStatus } from '../model/milestone-status';
import { Project } from '../model/project';
import { AddEditMilestoneDialogComponent } from './add-edit-milestone-dialog.component';
import { AuthService } from '../core/auth-service.component';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss']
})
export class ProjectComponent implements OnInit {
  displayedColumns = ['name', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  milestones: Milestone[];
  milestoneStatuses: MilestoneStatus[];
  project: Project;
  error: string;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _acctService: AccountService,
    public dialog: MatDialog,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    var projectId = this._route.snapshot.params.projectId;
    this._projectService.getMilestoneStatuses().subscribe(ms => {
      this.milestoneStatuses = ms;
    });
    this._projectService.getProject(projectId).subscribe(project => {
      this.project = project;
      this.milestones = project.milestones;
      this.dataSource.data = this.milestones;
    });
  }

  addMilestone() {
    var newMs = new Milestone();
    newMs.projectId = this.project.id;
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: newMs,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses[0],
        mode: 'Add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._projectService.addMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  editMilestone(milestone: Milestone) {
    var clonedMilestone = JSON.parse(JSON.stringify(milestone));
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: clonedMilestone,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses.find(ms => ms.id == milestone.milestoneStatusId)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._projectService.updateMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteMilestone(milestone: Milestone) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: { entityName: 'Milestone', message: `Are you sure you want to delete milestone ${milestone.name}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._projectService.deleteMilestone(milestone.id).subscribe(() => {
          this.ngOnInit();
        }, error => this.error = Utils.formatError(error));
      }
    });

  }

  getStatusName(id: number) {
    if (!this.milestoneStatuses) return '';
    var status = this.milestoneStatuses.find(ms => ms.id == id);
    return status ? status.name : 'unknown';
  }

  canEditProject(): boolean {
    if (
      !this.project ||
      !this._authService.authContext ||
      !this._authService.authContext.userProfile ||
      !this._authService.authContext.userProfile.userPermissions
    ) {
      return false;
    }
    const editPerm = this._authService.authContext.userProfile.userPermissions.find(
      up => up.projectId === this.project.id && up.value === 'Edit'
    );
    return !!editPerm || this._authService.authContext.isAdmin;
  }
}
