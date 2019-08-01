import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from "../../shared/services/projects.service";
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() projects:Project[];

  constructor(private projectsService: ProjectService) { }

  ngOnInit() {
  }

}
