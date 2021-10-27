import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../common/modal/dialog.service';
import { ModalComponent } from '../common/modal/modal.component';
import { ProjectServicesService } from '../services/project-services.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  public projects;
  public showModal = false;
  public modalData;
  emptyStateMessage = false;

  title = 'appBootstrap';
  closeResult: string;
  archiveData;

  constructor(
    private router: Router,
    private localStorage: ProjectServicesService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
      this.dialogService.dialogObservable$.subscribe(
        (res)=>{
          this.handleDialogEvents(res);
        }
      )
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.localStorage.getAllProjects().then(res=>{
      if(res){
          this.projects = res;
      }
    });

    this.localStorage.getAllKeys().then(keys=>{
      if(keys){
        const mergeData = [
          ...this.projects.map((value, key)=> {

              return {
                key: keys[key],
                name: value.name,
                status: value.status, 
                dateCreated: value.dateCreated, 
                archived: value.archived
               }
          })
        ]
        this.projects = mergeData;
        this.filterResults();
      }
    })
  }

  filterResults(){
    const filterArchived = this.projects.filter(projects => {
      return projects.archived === false;
    })

    this.projects = filterArchived;
    if(this.projects.length === 0){
      this.emptyStateMessage = true;
    }
  }

  create(){
     this.router.navigateByUrl("create", { skipLocationChange: true });
  }
  
  onArchive(event){

    this.modalData = {
      modalId: event.value.name,
      title: 'Warning',
      text: 'Are you sure that you want to archive ' + event.value.name +'?'
    }

    this.openDialog();

    this.archiveData = {
      key: event.value.key,
      values: {
        name: event.value.name,
        status: event.value.status,
        dateCreated: event.value.dateCreated, 
        archived: true
      }
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.modalData;

    this.dialog.open(ModalComponent, dialogConfig);
}

  handleDialogEvents(event){

    if(event === 'save'){
      this.closeDialog();

      this.localStorage.addProject(this.archiveData.key, this.archiveData.values).then(res=>{
        if(res){
          this.getData();
          console.log('Update successful');
        }
      })
    }

    return false;
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
