import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-historique-paiements',
  templateUrl: './historique-paiements.page.html',
  styleUrls: ['./historique-paiements.page.scss'],
})
export class HistoriquePaiementsPage implements OnInit {

  _result: any = {};

  eleve: any[] = [];

  constructor(
    private navController: NavController,
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
        historique: 1
      }, 'paiements')
      .subscribe(
        results => {
          this._result = results;
        }
        ,
        error => console.log("Error :: " + error)
      )
  }

  addPaiement(){
    this.navController.navigateForward(['/parent/form-paiements'])
  }

}
