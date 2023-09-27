import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-details.page.html',
  styleUrls: ['./classe-details.page.scss'],
})
export class ClasseDetailsPage implements OnInit {
  _result: any;
  loading: any;
  _toggleAppreciation = false;
  message = null;
  sujet = null;
  eleve = null;
  modalEleve: any = null;
  classe: any = {};

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public route: ActivatedRoute
  ) {
    this.classe.id = this.route.snapshot.queryParamMap.get("classe");
    }

  getData(): void {
    this.apiSerivce
      .get(
        {
          classe_id: this.classe.id,
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
        },
        'prof_classes'
      )
      .subscribe(
        (result) => {
          this._result = result;
          this.loading.dismiss();
          console.log(this._result);
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  ionViewDidLoad() {
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      mode: 'ios',
      duration: 10000
    });
    this.loading.present();
  }

  gotoHome() {
    this.navCtrl.navigateRoot(['/enseignant/planning']);
  }

  openMessage(eleve:any) {
    this.eleve = eleve.id;
    this.modalEleve = eleve;
    this.message = null;
    this.sujet = null;
    this._toggleAppreciation = true;
  }

  closeMessage() {
    this.eleve = null;
    this.modalEleve = null;
    this.message = null;
    this.sujet = null;
    this._toggleAppreciation = false;
  }

  sendMessage() {
    this.presentLoadingCustom();
    let query ={
      enseignant_id: this.authservice.enseignant ,
      eleve_id: this.eleve ,
      action: 'message' ,
      message: this.message ,
      sujet: this.sujet
    };
    this.apiSerivce.post(query, 'prof_classes').subscribe(
      async (result) => {
        this.loading.dismiss();
        let res: any = result;

        this.closeMessage();

        let alert = await this.alertCtrl.create({
          cssClass: res.status==202?'success_alert_boti':'danger_alert_boti',
          header: res.title,
          message: res.message,
          buttons: [
            {
              text: res.action,
              role: 'cancel',
              handler: () => {},
            },
          ],
        });
        alert.present();
      },
      (error) => {
        console.log(error);
        this.loading.dismiss();
      }
    );
  }

  getEleveDetails(eleve:any) {
    if (eleve.showDetails)
      this.navCtrl.navigateForward(['/enseignant/eleve-details'], {
        queryParams : { eleve: eleve.id }
      });
  }
}
