import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public projecte_desat: any;
  public creat: boolean = false
  public error: boolean = false
  public filesToUpload: any

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
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

        this.projecte_desat = response
        if (this.projecte_desat.project._id != ""){
          console.log(this.filesToUpload)
          this._uploadService.makeFileRequest(
            Global.url+'upload-image/'+this.projecte_desat.project._id,
            [],
            this.filesToUpload,
            'image')
            .then((result:any) => {
              console.log(result)
              console.log(`URL: ${Global.url+'upload-image/'+this.projecte_desat.project._id}`)
            });
            
          form.reset();
        }
        this.error = false
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
