import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offres-emploie',
  templateUrl: './offres-emploie.page.html',
  styleUrls: ['./offres-emploie.page.scss'],
})
export class OffresEmploiePage implements OnInit {
  _result = {
    translation : {
      "title" : "Offres Emploi",
      "emploi" : "Offres Emploi",
    }
  }

  constructor(
    private navCtrl : NavController,
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back()
  }

  goTo(id : number) {
    this.navCtrl.navigateForward(`/eleve/offre-emploie`)
  }
}
