import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-examens',
  templateUrl: './examens.page.html',
  styleUrls: ['./examens.page.scss'],
})
export class ExamensPage implements OnInit {

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
      }, 'prof_examens')
        .subscribe(
            result => {
              this._result = result;
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


  examenDetails(result: any) {
    if(result.active){
      this.navCtrl.navigateForward(['/enseignant/examen'],{
        queryParams: { examen: JSON.stringify(result) }
      });
    }
  }
  showExamenform() {
    this.navCtrl.navigateForward(['/enseignant/examen-form']);
  }

}
