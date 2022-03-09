import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    ProjectService
  ]
})
export class ProjectsComponent implements OnInit {
  public projects: Array<any> = [];
  public url: string = Global.url;
  constructor(
    private _projectService: ProjectService,
  ) { 
    
  }

  ngOnInit(): void {
    this.getProjects()
    console.log(this.projects)
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      result=>{
        console.log(result.projects.length)
        for(let i = 0; i < result.projects.length; i++){
          this.projects.push(result.projects[i])
        }
      },
      error => {
        console.log(error)
      }
    )
  }


}
