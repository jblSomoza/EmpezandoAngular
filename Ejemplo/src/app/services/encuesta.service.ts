import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta.model';
import { Comentario } from '../models/comentario.model'

@Injectable()
export class EncuestaService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getEncuestas(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url + 'encuestas', {headers: headers})
  }

  getEncuesta(token, id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url + "encuesta/" + id, {headers: headers});
  }

  addEncuesta(encuesta: Encuesta, token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(encuesta);

    return this._http.post(this.url + 'encuesta', params, {headers: headers});
  }

  addOpinion(token, id, encuesta: Encuesta): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(encuesta);

    return this._http.put(this.url + 'opinion/' + id, params, {headers: headers});
  }

  getComents(id, token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    
    return this._http.get(this.url + "coments/" + id, {headers: headers});
  }

  addComent(token, id, comentario: Comentario): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let params = JSON.stringify(comentario)

    return this._http.post(this.url + "coment/" + id, params, {headers: headers});
  }
}
