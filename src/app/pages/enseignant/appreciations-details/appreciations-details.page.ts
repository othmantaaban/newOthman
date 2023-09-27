import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-appreciations-details',
  templateUrl: './appreciations-details.page.html',
  styleUrls: ['./appreciations-details.page.scss'],
})
export class AppreciationsDetailsPage implements OnInit {
  _toggleAppreciation: boolean = false;
  selectedIns: any;
  selectAppreciation: any = null;
  textareaAppreciation: any = null;
  showPopUp: boolean = false;
  _result: any;
  examen: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public route: ActivatedRoute,
    private alertCtrl: AlertController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    public actionSheet: ActionSheetController
  ) {
    //@ts-ignore
    this.examen = JSON.parse(this.route.snapshot.queryParamMap.get('examen'));
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          appreciation: JSON.stringify(this.examen),
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
        },
        'evaluations_releves'
      )
      .subscribe(
        (result) => {
          this._result = result;
          console.log(this.loading);
          this.loading.dismiss();
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
  }

  ionViewDidLoad() {
    //this.presentLoadingCustom();
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

  submit() {
    this.presentLoadingCustom();
    this.apiSerivce
      .post(
        {
          enseignant_id: this.authservice.enseignant,
          data: JSON.stringify(this._result.data),
        },
        'evaluations_releves'
      )
      .subscribe(
        async (result) => {
          let eleves = this._result.data.eleves;
          eleves.forEach((eleve: any) => {
            if (eleve.appreciation) eleve.disable = true;
          });
          let res: any = result;
          // this.navCtrl.setRoot(ProfExamensPage);
          this.loading.dismiss();
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti',
            header: res.title,
            message: res.message,
            buttons: [
              {
                text: 'Fermer',
                role: 'cancel',
                handler: () => {},
              },
            ],
          });
          alert.present();
        },
        (error) => {
          this.loading.dismiss();
        }
      );
  }

  closeAppreciation() {
    this.textareaAppreciation = null;
    this.selectedIns = null;
    this.selectAppreciation = 'Tres bon travail';
    this._toggleAppreciation = !this._toggleAppreciation;
  }

  toggleAppreciation(index_eleve: any) {
    this.selectedIns = index_eleve;
    this.textareaAppreciation =
      this._result.data.eleves[this.selectedIns].appreciation;
    this._toggleAppreciation = !this._toggleAppreciation;
  }

  holdAppreciation() {
    let value = this.selectAppreciation;

    if (value) this._result.data.eleves[this.selectedIns].appreciation = value;
    // close modal
    //  this._toggleAppreciation = !this._toggleAppreciation;
    //  this.selectedIns = null;
    console.log(value);
    this.closeAppreciation();
  }

  changeSelectAppreciation(op: any) {
    this.selectAppreciation = op;
  }
}
