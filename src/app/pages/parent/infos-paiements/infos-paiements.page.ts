import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-infos-paiements',
  templateUrl: './infos-paiements.page.html',
  styleUrls: ['./infos-paiements.page.scss'],
})
export class InfosPaiementsPage implements OnInit {

  _result: any = {};

  constructor(
    private authservice: AuthService,
    private parentservice: ParentService,
    private apiservice: ApiService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        infos: 1
      }, 'paiements')
      .subscribe(
        results => {
          this._result = results;
        }
        ,
        error => console.log("Error :: " + error)
      )
  }

}
