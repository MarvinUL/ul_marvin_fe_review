import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ProjectsList } from '../projects-list/projects.model';
import { ProjectServicesService } from '../services/project-services.service';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css']
})
export class CreateProjectFormComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private localStorage: ProjectServicesService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  cancel(){
      this.router.navigateByUrl("/", { skipLocationChange: true });
  }

  get f() { return this.createForm.controls; }

  submit(){
    this.submitted = true;
      if (!this.createForm.invalid && this.submitted) {

         const projectProperties: ProjectsList = {
            name: this.createForm.value.name,
            status: this.createForm.value.status,
            dateCreated: moment().format('YYYY-MM-DD  HH:mm  a'),
            archived: false
         }
         const key = this.getRandomString();    

         this.localStorage.addProject(key, projectProperties).then(res=>{
           if(res){
             console.log('inserted successfully');
             this.router.navigateByUrl("/", { skipLocationChange: false });
           }
         });
      }
  }

   getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 5; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

}
