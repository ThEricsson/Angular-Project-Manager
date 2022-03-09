import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [
    ProjectService
  ]
})
export class DetailComponent implements OnInit {

  public projecte!: Project

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
      console.log(params)
    })



  }

  getProject(){//tienes que recojer el projecto del backend, diapo 29

  }

}
