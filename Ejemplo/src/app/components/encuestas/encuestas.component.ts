import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { Encuesta } from 'src/app/models/encuesta.model';
import { GLOBAL } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';
import { Comentario } from 'src/app/models/comentario.model';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  providers: [EncuestaService, UserService]
})
export class EncuestasComponent implements OnInit {

  @ViewChild('formAddEncuesta') formValuesAddEncuesta;
  public url;
  public identity;
  public token;
  public status: string;

  //Encuestas Variables

  public encuestas: Encuesta; // se traen los datos del modelo
  public encuestasModel: Encuesta;  //se envian los datos al modelo

  //Comentarios variables
  public coment: Comentario;    //Agrega los comentarios
  public coments: Comentario;   //Lista los comentario

  constructor(
    private _encuestaService: EncuestaService,
    private _userService: UserService
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdendtity();
    this.token = this._userService.getToken();
    this.encuestasModel = new Encuesta(
      "",
      "",
      "",
      {si: 0, no: 0, talvez:0, usuariosO: []},
      [],
      ""
    )
    this.coment = new Comentario("","","","");
  }

  ngOnInit() {
    this.getEncuestas();
  }

  getComentarios(id){
    this._encuestaService.getComents(id, this.token).subscribe(
      response => {
        if(response.comentarios){
          console.log(response.comentarios)
          this.coments = response.comentarios;
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )
  }

  addComentario(id){
    this._encuestaService.addComent(this.token, id, this.coment).subscribe(
      response =>{
        if(response.encuesta){
          this.status = 'Ok';
          console.log(response.encuesta);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )
  }

  getEncuesta(id){
    this._encuestaService.getEncuesta(this.token, id).subscribe(
      response =>{
        if(response.encuesta){
          console.log(response.encuesta)
          this.encuestasModel = response.encuesta;
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )
  }

  getEncuestas(){
    this._encuestaService.getEncuestas(this.token).subscribe(
      response=>{
        if (response.encuestas) {
          this.encuestas = response.encuestas;
          this.status = 'Ok'
        }else{
          this.status = 'Error'
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )      
  }

  addEncuesta(){
    this._encuestaService.addEncuesta(this.encuestasModel, this.token).subscribe(
      response =>{
        if(response.encuesta){
          console.log(response.encuesta);
          this.formValuesAddEncuesta.resetForm();
          this.getEncuestas();
          this.status = "ok";
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )
  }

  addOpinion(id){
    this._encuestaService.addOpinion(this.token, id, this.encuestasModel).subscribe(
      response =>{
        if(response.opinion){
          this.status = 'Ok';
          console.log(response.opinion);
        }
      },
      error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'Error'
        }
      }
    )
  }
}
