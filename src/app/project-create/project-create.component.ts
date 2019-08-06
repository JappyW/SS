import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification.service';
import { ProjectService } from '../shared/services/projects.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../shared/services/image.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


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
  selectedFiles: any;

  constructor(
    private authService: AuthService, public toastr: NotificationService, private projectService: ProjectService,
    private fb: FormBuilder, private router: Router, private imageService: ImageService, private db: AngularFirestore
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.ProjectNameForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]]
    });
  }

  createForm() { }

  get f() { return this.ProjectNameForm.controls; }

  create() {
    this.submitted = true;
    if (this.ProjectNameForm.invalid) {
      return;
    }
    if (this.authService.isLoggedIn) {
      let record = {};
      record['id'] = this.db.createId();
      record['name'] = this.projectName;
      record['description'] = this.projectDescription;
      record['users'] = [];
      record['imgref'] = "";
      record['owner'] = this.authService.afAuth.auth.currentUser.email;
      this.projectService.create(record).then(resp => {
        this.projectName = undefined;
        this.projectDescription = undefined;
        this.projectImg = undefined;
      })
        .catch(error => {
          this.toastr.showError(error, "Error");
        });
      this.imageService.uploadFileForProject(this.selectedFiles, record);
      this.toastr.showSuccess("Project has been created!", "Created successfuly!");
    }
    else {
      this.toastr.showWarning("You must be registered to perform this action!", "You`re not registered!");
    }
    this.router.navigateByUrl('/');
  }

  detectFiles(event) {
    this.selectedFiles = event;
  }

}
