import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ProjectModel } from '../../models/Project';
import projectsJson from './projects.json';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: ProjectModel[] = Object.assign([],  projectsJson);
  assetsFolder: string = '../../../assets/projects/';
  modal_image_path: string = "";
  modal_image_caption: string = "";

  constructor(public dialog: MatDialog) {}

  open_source(project: ProjectModel){
    if (project.source != null)
      window.open(project.source, "_blank");
  }

  get_asset_path(asset_path: string) {
    return this.assetsFolder + asset_path;
  }

  show_modal_image(path: string) {
    const dialogRef = this.dialog.open(ProjectsModalComponent, {
      data: { path: this.get_asset_path(path) }
    });
  }


}

@Component({
  selector: 'app-projects-model',
  template:`
    <div mat-dialog-content class="modal-content">
    <img class="modal-image" [src]="data.path">
    </div>`,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { path: string },
  ){}
}