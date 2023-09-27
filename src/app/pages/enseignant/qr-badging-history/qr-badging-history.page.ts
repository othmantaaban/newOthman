import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-qr-badging-history',
  templateUrl: './qr-badging-history.page.html',
  styleUrls: ['./qr-badging-history.page.scss'],
})
export class QrBadgingHistoryPage {

  results: any;
  loading: any;
  showModal:boolean = false;
  showModalProfil:boolean = false;
  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    private apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
  ) { }

  ionViewWillEnter()
  {
    this.presentLoadingCustom().then(()=>{
      this.load();
    });
  }

  load()
  {
    this.apiSerivce.get({
      enseignant_id : this.authservice.enseignant,
      key  : this.authservice.token,
      history: true
    },'pointage')
        .subscribe(
            (results:any) => {
              this.results =  results;

               
              this.loading.dismiss();
            }
              , 
            error => console.log("Error :: " + error)
    )
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


}
