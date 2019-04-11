import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
public user:User[];
constructor(private _userService: UserService){
}

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response=>{
        if(response){
          console.log(response.usuarios);
          this.user = response.usuarios;
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
