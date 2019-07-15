import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/projects.service'
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  filteredItems: any;
  projects: any;
  projectName: string;
  projectDescription: string;
  
  constructor(private projectService: ProjectService, public authService: AuthService) { } 

  ngOnInit() {
    this.projectService.getProjects().subscribe(data =>{
      this.projects = data.map(e =>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          owner: e.payload.doc.data()['owner']
        };
      })
      console.log(this.projects);
    });
  }

  create() {
    if(this.authService.isLoggedIn){
    let record = {};
    record['name'] = this.projectName;
    record['description'] = this.projectDescription;
    record['owner'] = this.authService.afAuth.auth.currentUser.email;
    console.log(record);
    this.projectService.createProject(record).then(resp => {
      this.projectName = "";
      this.projectDescription = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
    }
    else{
      alert("You`re not registered!")
    }
  }
  edit(record) {
    record.isEdit = true;
    record.EditName = record.name;
    record.EditDescription = record.description;
  }
 
  update(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['description'] = recordRow.EditDescription;
    this.projectService.updateProject(recordRow.id, record);
    recordRow.isEdit = false;
  }
  delete( id){
      this.projectService.deleteProject(id);    
  }
  checkRole(record){
    if(this.authService.afAuth.auth.currentUser){
      if(record.owner == this.authService.afAuth.auth.currentUser.email){
        return true
      } 
      else
        false
      }
  }
}
