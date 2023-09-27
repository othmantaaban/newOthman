import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.page.html',
  styleUrls: ['./discipline.page.scss'],
})
export class DisciplinePage {

  eleve:any;
  _result: any;

  show_score: boolean = false;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
  ) { 
    this.eleve = this.parentservice.currentEleve;
  }

  ionViewWillEnter()
  {
    this.load();

  }

  load()
  {
    this.apiSerivce.get(
      { 
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'discipline')
    .subscribe(
        result => {
          this._result = result[0]
        }, 
        error => console.log("Error :: " + error)
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisciplinePage');
  }

}
