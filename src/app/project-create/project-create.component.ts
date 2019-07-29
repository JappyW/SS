import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification.service';
import { ProjectService } from '../shared/services/projects.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  projectDescription: string;
  projectName: string;
  projectImg: string;

  ProjectNameForm: FormGroup;
  submitted = false;

  constructor( private authService : AuthService, public toastr : NotificationService, private projectService : ProjectService, private fb: FormBuilder,private router: Router) {
    this.createForm();
   }
   createForm() {
     
  } 
  get f() { return this.ProjectNameForm.controls; }

  ngOnInit() {
    this.ProjectNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      img: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]          
  });
  }
  
  onSubmit() {}

  create() {
    this.submitted = true;
    if (this.ProjectNameForm.invalid) {
      return;
    }
      
    if(this.authService.isLoggedIn){
      let record = {};
      record['name'] = this.projectName;
      record['description'] = this.projectDescription;
      record['users'] = [];
      if(this.projectImg){
        record['imgref'] = this.projectImg;
      }
      else
        record['imgref'] = "https://image.freepik.com/free-vector/light-blue-project-management-concept_23-2147782704.jpg";

      record['owner'] = this.authService.afAuth.auth.currentUser.email;
      this.projectService.createProject(record).then(resp => {
        this.projectName = "";
        this.projectDescription = undefined;
        this.projectImg = undefined;
      })
        .catch(error => {
          console.log(error);
        });
    this.toastr.showSuccess("Project has been created!", "Created successfuly!");

    }
    else{
      this.toastr.showWarning("You must be registered to perform this action!", "You`re not registered!");
    }
    this.router.navigateByUrl('/');
    }

}
