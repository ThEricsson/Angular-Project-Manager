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
  public update: boolean = false
  public url: string = Global.url
  public llenguatges: string[] = ["typescript", "javascript", "python", "php", "c", "java"]

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
      this.title = "Crear Projecte";
      this.project = new Project('','','','',2022,[''],'');
   }

  ngOnInit(): void {
  }

  //Funció que s'executa en el moment que l'usuari prem el botó de crear projecte,
  // gràcies al servei saveProject ens connectem al backend per guardar les dades i la imatge del projecte.
  onSubmit(form: any): any{

    this._projectService.saveProject(this.project).subscribe(
      response =>{

        this.projecte_desat = response["project"]
        if (this.projecte_desat._id != ""){
          this._uploadService.makeFileRequest(
            Global.url+'upload-image/'+this.projecte_desat._id,
            [],
            this.filesToUpload,
            'image')
            .then((result:any) => {
              console.log(result)
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

  //Funció que s'executa en el moment en el que l'usuari canvia l'arxiu de l'imput de les imatges
  fileChangeEvent(fileInput: any){
    console.log(fileInput)
    
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
