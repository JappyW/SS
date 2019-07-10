import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/projects.service'
import { Project } from 'src/app/project.model'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  constructor(private projectService: ProjectService) { }
  projects: any;
  projectName: string;
  projectDescription: number;

  ngOnInit() {
    this.projectService.getProjects().subscribe(data =>{
      this.projects = data.map(e =>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description']  
        } 
      })
    });
  }

  create() {
    let record = {};
    record['name'] = this.projectName;
    record['description'] = this.projectDescription;
    this.projectService.createProject(record).then(resp => {
      this.projectName = "";
      this.projectDescription = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
  edit(record) {
    record.EditName = record.name;
    record.EditDescription = record.description;
  }
 
  update(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['description'] = recordRow.EditAge;
    this.projectService.updateProject(recordRow.id, record);
    recordRow.isEdit = false;
  }
  delete(id){
    this.projectService.deleteProject(id);
  }

}
