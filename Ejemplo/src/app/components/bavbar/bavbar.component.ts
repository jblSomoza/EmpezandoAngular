import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bavbar',
  templateUrl: './bavbar.component.html',
  styleUrls: ['./bavbar.component.scss'],
  providers:[UserService]
})
export class BavbarComponent implements OnInit {
public identity;

  constructor(private _userService: UserService) {
    this.identity = this._userService.getIdendtity()
   }

  ngOnInit() {
  }

}
