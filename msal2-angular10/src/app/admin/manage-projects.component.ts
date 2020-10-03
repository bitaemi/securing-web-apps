import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { ProjectService } from '../core/project.service';
import { Utils } from '../core/utils';
import { Project } from '../model/project';
import { AddProjectDialogComponent } from './add-project-dialog.component';
import { DeleteDialogComponent } from './delete-dialog.component';

@Component({
  selector: 'app-manage-projects',
  templateUrl: 'manage-projects.component.html',
  styleUrls: ['manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {
  displayedColumns = ['name', 'actions'];
  error: string;
  dataSource = new MatTableDataSource();
  projects: Project[];

  constructor(
    private _projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource.data = projects;
    }, error => this.error = Utils.formatError(error));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '348px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newProj = new Project();
        newProj.name = result;
        this._projectService.addProject(newProj).subscribe(project => {
          this.projects.push(project);
          this.dataSource.data = this.projects;
        }, error => this.error = Utils.formatError(error));
      }
    });
  }

  deleteProject(project: Project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: { entityName: 'Project', message: `Are you sure you want to delete project ${project.name}?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._projectService.deleteProject(project).subscribe(() => {
          this.projects.splice(this.projects.indexOf(project), 1);
          this.dataSource.data = this.projects;
        }, error => this.error = Utils.formatError(error));
      }
    });
  }

}
