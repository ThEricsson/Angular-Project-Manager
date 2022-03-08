import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public projecte_desat: any;
  public creat: boolean = false
  public error: boolean = false
  public filesToUpload: any

  constructor(
    private _projectService: ProjectService
  ) {
      this.title = "Crear Projecte";
      this.project = new Project('','','','',2022,[''],'');
   }

  ngOnInit(): void {
  }

  onSubmit(form: any): any{
    console.log(this.project)

    this._projectService.saveProject(this.project).subscribe(
      response =>{
        this.error = false
        this.projecte_desat = response
        form.reset()
        this.creat = true
      },
      error => {
        this.creat = false
        console.log(error)
        this.error = true
      }

    )
  }

  fileChangeEvent(fileInput: any){
    console.log(fileInput)
    

    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
