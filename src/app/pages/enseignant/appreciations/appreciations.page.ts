import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-appreciations',
  templateUrl: './appreciations.page.html',
  styleUrls: ['./appreciations.page.scss'],
})
export class AppreciationsPage implements OnInit {

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
      }, 'evaluations_releves')
        .subscribe(
            result => {
              this._result = result;
              console.log(this._result.translation);
              
              //this.loading.dismiss();
            },
            error => console.log("Erreur :: " + error)
        )
  }

  ngOnInit(): void {
      this.getData();
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


  examenDetails(result:any) {
    this.navCtrl.navigateForward(['/enseignant/appreciations-details'],{
      queryParams: { examen: JSON.stringify(result) }
    });
  }
}
