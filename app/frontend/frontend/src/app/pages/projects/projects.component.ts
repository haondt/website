import { Component } from '@angular/core';
import { ProjectModel } from '../../models/Project';
import projectsJson from './projects.json';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: ProjectModel[] = Object.assign([],  projectsJson);
  assetsFolder: string = '../../../assets/projects/';

  open_source(project: ProjectModel){
    if (project.source != null)
      window.open(project.source, "_blank");
  }

  get_asset_path(asset_path: string) {
    return this.assetsFolder + asset_path;
  }
}
