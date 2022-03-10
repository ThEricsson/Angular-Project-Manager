import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project';
import { global } from '@angular/compiler/src/util';
import { Global } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class EditComponent implements OnInit {
  public project: Project = new Project('','','','',0,[''],'')
  public id!: any;
  public url: string = Global.url
  public llenguatges: string = "";
  public title: string;
  public projecte_desat: any;
  public creat: boolean = false
  public error: boolean = false
  public filesToUpload: any
  public update: boolean = true;

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
  ) { 
    this.title = 'Editar component'
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })    

    this.getProject(this.id)
  }

  getProject(id: any): void
  {//tienes que recojer el projecto del backend, diapo 29

    this._projectService.getProject(id).subscribe(
      result => {
        this.project = result['project']
        this.project.langs.forEach(lang => {
          this.llenguatges += lang+" "         
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  fileChangeEvent(fileInput: any){
    console.log(fileInput)
    
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onSubmit(form: any): void{

  }

}
