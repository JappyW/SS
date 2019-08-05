import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from "../../shared/services/projects.service";
import { Project } from 'src/app/shared/models/project.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project; 

  constructor(private projectsService: ProjectService, private authService: AuthService) { }

  ngOnInit() {
  }

 

}
