import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.page.html',
  styleUrls: ['./trajet.page.scss'],
})
export class TrajetPage implements OnInit {

  _result: any;
  loading: any;
  unites: any;
  trajet: any;
  ordre: any;

  constructor(
    private alertCtrl: AlertController,
    public route: ActivatedRoute,
    public authservice: AuthService,
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public location: Location,
    public loadingCtrl: LoadingController
  ) {
    this.trajet = this.route.snapshot.queryParamMap.get('trajet');
    this.ordre = this.route.snapshot.queryParamMap.get('ordre');
  }

  getData(): void {
    this.apiSerivce.get(
      {
        pick_id : this.authservice.pick,
        key  : this.authservice.token,
        trajet : this.trajet,
        ordre :  this.ordre,
      }, 'pick_trajets_tst_absent')
        .subscribe(
            result => {
              this._result = result;
            //  this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        );
  }

  ionViewDidLoad() {
    //this.presentLoadingCustom();
  }
  
  ngOnInit(): void {
    this.getData();
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

  sendAction(eleve:any,action:any){

    this.apiSerivce.post( {
      pick_id : this.authservice.pick,
      key  : this.authservice.token,
      trajet:this.trajet,
      ordre:this.ordre,
      eleve:eleve.id,
      action:action
    }, 'pick_trajets_tst_absent')
        .subscribe( 
            async result => {
              let res: any = result;
              eleve.picked = res.picked;
              eleve.absent = res.absent;
              eleve.arrived = res.arrived;
              let alert = await this.alertCtrl.create({
                cssClass: 'success_alert_boti success_alert_checkout ',
                header: res.msg ,
                buttons: []
                // buttons: [
                //   {
                //     text: 'Fermer',
                //     handler: () => {
                //     }
                //   }]
              });
              alert.present();

              setTimeout(() => {
                alert.dismiss();
              }, 1000);

              // this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        );
  }
  newParcours(){
    this.apiSerivce.post( {
      pick_id: this.authservice.pick,
      key: this.authservice.token,
      trajet:this.trajet,
      new_parcours:"true"
    }, 'pick_trajets_tst_absent')
        .subscribe( 
            async result => {
              let res: any = result;
              let alert = await this.alertCtrl.create({
                cssClass: 'success_alert_boti success_alert_checkout ',
                header: res.msg ,
                buttons: [
                  {
                    text: 'Fermer',
                    handler: () => {
                      
                    }
                  }]
              });
              alert.present();
              this.getData();
              // this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        );
  }}
