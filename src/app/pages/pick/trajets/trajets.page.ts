import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.page.html',
  styleUrls: ['./trajets.page.scss'],
})
export class TrajetsPage implements OnInit {
  eleve: any;
  _result: any;
  loading: any;
  unites: any;
  showModal: boolean = false;
  showModalProfil: boolean = false;
  isadmin: boolean = false;
  isparent: boolean = false;
  isenseignant: boolean = false;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    // public events: Events,
    // private storage: Storage,
    // private fcm: FCM,
  ) {
    this.isadmin = this.authservice.admin;
    this.isparent = this.authservice.parent;
    this.isenseignant = this.authservice.enseignant;

  }

  getData(): void {
    this.apiSerivce.get(
      {
        pick_id: this.authservice.pick,
        key: this.authservice.token,
      }, 'pick_trajets_tst_absent')
      .subscribe(
        result => {
          this._result = result;
          // this.tripleAccount = this._result.acces_enseignant;
          console.group(this._result.trajets);

          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TrajetsPage');
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

  getTrajet(trajetID:any, action:any) {
    this.navCtrl.navigateForward(['/pick/trajet'], {
      queryParams : {
        trajet: trajetID,
        ordre: action
      }
    });
  }


  toggleModalProfil() {
    this.showModalProfil = !(this.showModalProfil) ? true : false;
  }

  switchToParent() {
    this.authservice.goToHome('parent')
    // this.events.publish('user:changetoparent');
  }

  switchToProf() {
    this.authservice.goToHome('enseignant')
    // this.events.publish('user:changetoprof');
  }

  switchToAdmin() {
    this.authservice.goToHome('admin')
    // this.events.publish('user:changetoprof');
  }

  logout() {
    
    this.authservice.logout();

  //   if(!MyApp.onDev){
  //     this.fcm.getToken().then((token) => {
  //       let query = "token=" + token + "&user_id=" + ApiService.userId + "&key=" + ApiService.keyToken;
  //       this.apiSerivce.postData(query, 'logout').subscribe((result) => {
  //         console.log("Logout");
  //       });
  //     });
  //   }

  //   ApiService.activeEleve = null;
  //   ApiService.eleveId = null;
  //   ApiService.enseignantId = null;
  //   ApiService.pickId = null;
  //   ApiService.parentId = null;

  //   this.storage.remove('boti_auth');
  //   this.storage.remove('boti_userId');
  //   this.storage.remove('boti_eleveId');
  //   this.storage.remove('boti_parentId');
  //   this.storage.remove('boti_pickId');
  //   this.storage.remove('boti_enseignantId');
  //   this.storage.remove('boti_keyToken');
  //   this.storage.remove('boti_activeEleve');
  //   this.navCtrl.setRoot(HomePage);
  }

  moncompte() {
    this.navCtrl.navigateForward(['/pick/compte']);
  }

}
