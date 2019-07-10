import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../shared/projects.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectsService: ProjectService) { }

  ngOnInit() {
  }

}
