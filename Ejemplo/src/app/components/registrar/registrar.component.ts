import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-components',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  providers: [UserService]
})
export class RegistrarComponent implements OnInit {
  public user: User;
  public status;

  constructor(
    private _userService: UserService
  ) {
    this.user = new User("","","","","","ROL_USUARIO","")
   }

  ngOnInit() {
  }
  
registrar(){
  this._userService.registro(this.user).subscribe(
    response=>{
      if(response){
        this.status = 'ok'
        console.log(response)
      }
    },
    error=>{
      console.log(<any>error);
      this.status = 'error'
    }
  )
}

}
