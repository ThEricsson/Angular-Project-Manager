import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";


import { Project } from "../models/project";
import { Global } from './global';

//Servei on es situa totes les funcions per fer peticións al backend

@Injectable()
export class ProjectService{

    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return "Prova el servei"
    }

    //Funció per guardar el projecte passat per paràmetre al backend, amb una petició post
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url+'save-project', params, {headers: headers})
    }

    //Funció per demanar tots els projectes del backend
    getProjects(): Observable<any>{
        return this._http.get(this.url+'projects')
    }

    //Funció per demanar un projecte per id al backend
    getProject(id: string): Observable<any>{
        return this._http.get(this.url+'project/'+id)
    }

    deleteProject(id: string): Observable<any>{
        return this._http.delete(this.url+'project/'+id)
    }
    
    //Funció per actualitzar un projecte 
    updateProject(id: string, project: Project): Observable<any>{
        let body = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.put(this.url+'project/'+id, body, {headers: headers})
    }

}