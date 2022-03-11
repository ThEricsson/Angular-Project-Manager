import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";


import { Project } from "../models/project";
import { Global } from './global';

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

    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url+'save-project', params, {headers: headers})
    }

    getProjects(): Observable<any>{
        return this._http.get(this.url+'projects')
    }

    getProject(id: string): Observable<any>{
        return this._http.get(this.url+'project/'+id)
    }

    deleteProject(id: string): Observable<any>{
        return this._http.delete(this.url+'project/'+id)
    }
    
    updateProject(id: string, project: Project): Observable<any>{
        let body = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.put(this.url+'project/'+id, body, {headers: headers})
    }

}