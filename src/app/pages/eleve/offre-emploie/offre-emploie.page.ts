import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offre-emploie',
  templateUrl: './offre-emploie.page.html',
  styleUrls: ['./offre-emploie.page.scss'],
})
export class OffreEmploiePage implements OnInit {
  _result = {
    translation : {
      "title" : "Offres Emploi",
    }
  }

  postule_sent : boolean = false;

  constructor(
    private navCtrl : NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.back()
  }

  postuler(){
    this.alertCtrl.create({
      cssClass: "success_alert_boti",
      header: 'Vous avez postulé avec succès !',
      message: "",
      buttons: [
        {
          text: 'OK',
          role: "cancel",
          handler: () => { 
            this.postule_sent = true;
          },
        },
      ],
    }).then((alert) => {
      alert.present();
    });
  }
}
