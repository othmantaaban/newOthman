import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.page.html',
  styleUrls: ['./mon-compte.page.scss'],
})
export class MonComptePage implements OnInit {

  // eleve:any;
  // loading: any;
  // loadingBlur: any;
  // _result: any;

  // currentEleve : any;

  // otherEleves: any;

  // constructor(
  //   private navCtrl: NavController,
  //   private apiSerivce: ApiService,
  //   private authservice: AuthService,
  //   private parentservice: ParentService,
  //   private loadingCtrl: LoadingController,
  //   private router: Router,
  //   private storage: Storage,
  //   private nav : NavController,
  // ) { 
  //   this.eleve = this.parentservice.currentEleve;
  // }

  // ionViewDidLoad() {
    
  // }

  // async presentLoadingCustom() {
  //     this.loading = await this.loadingCtrl.create({
  //     spinner: null,
  //     message: ApiService.loaderHtml,
  //     mode: 'ios',
  //     duration: 10000
  //   });
  //   this.loading.present();
  // }

  // getData(): void {
  //   this.apiSerivce.get({
  //     user_id : this.authservice.user,
  //     parent_id : this.parentservice.parentId,
  //     key  : this.authservice.token,
  //     }, 'compte')
  //       .subscribe(
  //           result => { 
  //             this._result = result;
  //             console.log(this._result, 'yes');
  //             // this.events.publish('storage:infos', this._result);
  //             this.otherEleves = this._result.eleves.filter((item:any)=>{
  //               return item.id != this.eleve.id; 
  //             });
              
  //             this.currentEleve = this._result.eleves.filter((item:any)=>{
  //               return item.id == this.eleve.id; 
  //             })[0];
              
  //             this.loading.dismiss();
  //             this.loadingBlur = null;
  //           }, 
  //           error =>  {
  //             console.log("Error :: " + error);
  //             this.loading.dismiss();
  //           }
  //       )
  // }

  // async changeprofil(eleve:any) {

  //   this.parentservice.currentEleve = eleve;

  //   await this.storage.set('boti_activeEleve', eleve.id);

  //   this.nav.navigateRoot('/eleve/')

  // }

  // ngOnInit(): void {
  //   this.presentLoadingCustom().then(()=>{
  //     this.getData();
  //   })
  // }

  // compteEleve(eleve: any) {

  //   this.navCtrl.navigateRoot(['/eleve/compte-eleve'], {
  //     queryParams: {
  //       eleve: JSON.stringify(eleve)
  //     }
  //   });
  // }
  
  // async changePassword() {
  //   this.router.navigate(['/eleve/forgot-password'])
  //   // this.navCtrl.push(ChangePasswordPage);
  // }

  // compteParent(parent: any) {
  //   this.navCtrl.navigateRoot(['/eleve/compte-parent'], {
  //     queryParams: {
  //       parent: JSON.stringify(parent)
  //     }
  //   });
  // }

  // logout(){
  //   this.authservice.logout();
  // }

  // switchTo(eleve:any){
  //   console.log(eleve);
  //   this.parentservice.switchEleve(eleve)
    
  // }

  editProfile(){
    
    this.navCtrl.navigateRoot(['/eleve/compte-eleve'], {
      queryParams: {
        eleve: JSON.stringify(this.currentEleve)
      }
    });
  }

  eleve:any;
  loading: any;
  loadingBlur: any;
  _result: any;

  currentEleve : any;

  otherEleves: any;

  constructor(
    private navCtrl: NavController,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage,
    private nav : NavController,
    private route: ActivatedRoute,
    private toast : ToastController
  ) { 
    this.eleve = this.parentservice.currentEleve;
  }

  goToFunc(endPoint : string, data = null) {
    this.navCtrl.navigateRoot(`/eleve/${endPoint}`, {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }

  // ionViewDidLoad() {
    
  // }

  async presentLoadingCustom() {
      this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      mode: 'ios',
      duration: 10000
    });
    this.loading.present();
  }

  getData(): void {
    
    this.apiSerivce.get({
      user_id : this.authservice.user,
      parent_id : this.parentservice.parentId,
      key  : this.authservice.token,
      acces: this.authservice.acces 
      }, 'compte')
        .subscribe(
            result => { 
              console.log(result);
              
              this._result = result;
              console.log(this._result, 'yes');
              // this.events.publish('storage:infos', this._result);
              this.otherEleves = this._result.eleves.filter((item:any)=>{
                return item.id != this.eleve.id; 
              });
              
              this.currentEleve = this._result.eleves.filter((item:any)=>{
                return item.id == this.eleve.id; 
              })[0];
              
              this.loading.dismiss();
              this.loadingBlur = null;
            }, 
            error =>  {
              console.log("Error :: " + error);
              this.loading.dismiss();
            }
        )
  }

  async changeprofil(eleve:any) {

    this.parentservice.currentEleve = eleve;

    await this.storage.set('boti_activeEleve', eleve.id);

    this.nav.navigateRoot('/parent/')

  }
  ionViewWillEnter() {
    console.log("hello");
    
    this.presentLoadingCustom().then(()=>{
      this.getData();
      this.presentToast()
    })
  }
  ngOnInit(): void {
  }

  // compteEleve(eleve: any) {

  //   this.navCtrl.navigateRoot(['/parent/compte-eleve'], {
  //     queryParams: {
  //       eleve: JSON.stringify(eleve)
  //     }
  //   });
  //   // this.router.navigate(['/parent/compte-eleve'],{
  //   //   queryParams:{
  //   //     eleve: JSON.stringify(eleve)
  //   //   }
  //   // })
  // }
  
  // async changePassword() {
  //   this.router.navigate(['/parent/forgot-password'])
  //   // this.navCtrl.push(ChangePasswordPage);
  // }

  // compteParent(parent: any) {
  //   // this.router.navigate(['/parent/compte-parent'],{
  //   //   queryParams:{
  //   //     parent: JSON.stringify(parent)
  //   //   }
  //   // })

  //   this.navCtrl.navigateRoot(['/parent/compte-parent'], {
  //     queryParams: {
  //       parent: JSON.stringify(parent)
  //     }
  //   });
  // }

  // logout(){
  //   this.authservice.logout();

  //   // if(!MyApp.onDev){
  //   //   this.fcm.getToken().then((token) => {
  //   //     let query = "token=" + token + "&user_id=" + ApiService.userId + "&key=" + ApiService.keyToken;
  //   //     this.apiSerivce.postData(query, 'logout').subscribe((result) => {
  //   //       console.log("Logout");
  //   //     });
  //   //   });
  //   // }

  //   // ApiService.activeEleve = null;
  //   // ApiService.eleveId = null;
  //   // ApiService.enseignantId = null;
  //   // ApiService.pickId = null;
  //   // ApiService.parentId =  null;
    
  //   // this.storage.remove('boti_auth');
  //   // this.storage.remove('boti_userId');
  //   // this.storage.remove('boti_eleveId');
  //   // this.storage.remove('boti_parentId');
  //   // this.storage.remove('boti_enseignantId');
  //   // this.storage.remove('boti_pickId');
  //   // this.storage.remove('boti_keyToken');
  //   // this.storage.remove('boti_activeEleve');
    
  //   // this.navCtrl.setRoot(HomePage);
  // }

  // switchTo(eleve:any){
  //   console.log(eleve);
  //   this.parentservice.switchEleve(eleve)
    
  // }

  async presentToast() {
    // this.router
    let val = this.route.snapshot.queryParamMap.get('data');
    console.log(val);
    
    if (val) {
      console.log("hello");
      let obj = JSON.parse(val)
      let toastToDisplay = await this.toast.create(
        {
          message: obj.message,
          duration: 1500,
          position: "top",
          color: ""
        }
      )
      console.log("hello");

      await toastToDisplay.present()
    }
  }

  logout(){
    this.authservice.logout();
  }
}
