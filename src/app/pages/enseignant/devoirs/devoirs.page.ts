import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-devoirs',
  templateUrl: './devoirs.page.html',
  styleUrls: ['./devoirs.page.scss'],
})
export class DevoirsPage implements OnInit {

  _result: any;
  loading: any;
  type: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute
  ) {
    this.type = this.route.snapshot.queryParamMap.get('type');
  }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token,
        type  : 'devoir'
      }, 'prof_contents')
        .subscribe(
            result => {
              this._result = result;
              this.loading.dismiss();
            },
            error => console.log("Erreur :: " + error)
        )
  }

  ngOnInit(): void {
    console.log(this.type);
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

  ajouterDevoir() {
      this.navCtrl.navigateForward(['/enseignant/devoirs-form'],{
        queryParams: { type: this.type }
      });
    
  }

  devoirDetails(result:any) {
    this.navCtrl.navigateForward(['/enseignant/devoir'],{
      queryParams: {
        result: JSON.stringify(result),
        type: this.type
      }
    });
  }

  gotoHome(){
    this.navCtrl.navigateRoot(['/enseignant/planning']);
  }

}
