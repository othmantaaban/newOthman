import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AnyCnameRecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.page.html',
  styleUrls: ['./competences.page.scss'],
})
export class CompetencesPage implements OnInit {

  _result: any;
  loading: any;
  type: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public loadingCtrl: LoadingController
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token
      }, 'prof-competences')
        .subscribe(
            result => {
              this._result = result;
              console.log(this._result);
              
              this.loading.dismiss();
            },
            error => console.log("Erreur :: " + error)
        )
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


  examenDetails(result:AnyCnameRecord) {
    this.navCtrl.navigateForward(['/enseignant/competences-details'],{
      queryParams: { examen: JSON.stringify(result) }
    });
  }

  showExamenform(){
    this.navCtrl.navigateForward(['/enseignant/competences-form']);
  }

}
