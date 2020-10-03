import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { ProjectService } from '../core/project.service';
import { Utils } from '../core/utils';
import { Project } from '../model/project';

@Component({
  selector: "app-projects",
  templateUrl: "project-list.component.html"
})
export class ProjectListComponent implements OnInit {
  displayedColumns = ["name"];
  error: string;
  dataSource = new MatTableDataSource();
  projects: Project[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this._projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource.data = projects;
    }, error => Utils.formatError(error));
  }
}
