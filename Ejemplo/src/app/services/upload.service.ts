import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";

@Injectable()
export class UploadService {
  public url: String;
  constructor() {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest; //Peticion de xml en http

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name); //append abre el nombre del archivo y obtiene el nombre del archivo
      }

      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response))   //Se parse a JSON
          }else{
            reject(xhr.response)  //No envia los datos
          }
        }
      }

      xhr.open('POST', url, true);    //Indica el metodo el cual vamos a trabajar, se trabaja con post por que vamos a subir una imagen
      xhr.setRequestHeader('Authorization', token); //Nos permite limpiar las cabeceras
      xhr.send(formData); //Le enviamos el formData, son todos los datos
    })
  }
}
