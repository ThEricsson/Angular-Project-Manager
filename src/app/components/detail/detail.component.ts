import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project';
import { global } from '@angular/compiler/src/util';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [
    ProjectService
  ]
})
export class DetailComponent implements OnInit {

  public projecte: Project = new Project('','','','',0,[''],'')
  public id!: any;
  public url: string = Global.url
  public llenguatges: string = "";
  public delAlert: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
  ) { 
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
        this.projecte = result['project']
        this.projecte.langs.forEach(lang => {
          this.llenguatges += lang+" "         
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  onDelete(): void
  {
    this._projectService.deleteProject(this.id).subscribe(
      result=>{
        console.log(result)
        window.location.href = '/projects';
      },
      error=>{
        console.log(error)
      }
    )
    
  }

}
