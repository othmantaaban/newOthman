import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-etat-paiements',
  templateUrl: './etat-paiements.page.html',
  styleUrls: ['./etat-paiements.page.scss'],
})
export class EtatPaiementsPage {

  @Input('progress') progress: any;
  eleve:any;
  _result: any;
  loading: any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController
    ) { }

  ionViewWillEnter()
  {
    this.presentLoadingCustom().then(()=>{
      this.getData();
      this.eleve = this.parentservice.currentEleve
    });
  }

  getData(): void {
    this.apiservice.get(
      { 
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'paiements')
        .subscribe(
            results => { 
              this._result = results;
              this.loading.dismiss();
            }
              , 
            error => console.log("Error :: " + error)
        )
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

  progressColor(pctg: any) {
    if ( pctg == 0 ){
      return '#af222a';
    }else if( pctg < 50 &&  pctg < 100 ){
        return '#e37931';
    }else{
      return '';
      // return '#e37931';
    }
  }
}
