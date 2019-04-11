import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import {GLOBAL} from "./global.service";

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }
   registro(user: User): Observable<any>{
     let params = JSON.stringify(user);
     let headers = new HttpHeaders().set('Content-Type','application/json')
     
     return this._http.post(this.url+'registrar', params, {headers: headers})
   }

   getUsers(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    
    return this._http.get(this.url+'usuarios',{headers: headers})
  }

  login(user, gettoken = null): Observable<any>{
    if(gettoken != null){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.post(this.url+ 'login',params,{headers:headers})
  }
  //El sesion storage guarda los datos cuando nos logueamos
  getIdendtity(){ //Va a ir al sesion storage y traer los datos
    var identity = JSON.parse(sessionStorage.getItem("identity"))
    if(identity != 'undefined'){
      this.identity = identity;

    }else{
      this.identity = null;
    }
    return this.identity;

  }

  getToken(){ //Va a traer el token del usuario logueado
    var token2= (sessionStorage.getItem('token'))
    if(token2 != 'undefined'){
      this.token = token2;

    }else{
      this.token = null;
    }
    return this.token;

  }

  updateUser(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken())

    return this._http.put(this.url + 'editar-usuario/' + user._id, params, {headers: headers});
  }
}
