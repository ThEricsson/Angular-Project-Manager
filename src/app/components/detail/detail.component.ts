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

  //A l'inici recollim les dades amb la funció getProject
  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })    

    this.getProject(this.id)
  }

  //Funció per recollir les dades per id, fent servir el servei ProjectService
  getProject(id: any): void
  {

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

  //Funció que s'executarà en el moment en què l'usuari premi el botó d'eliminar
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
