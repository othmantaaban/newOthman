import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  // @ts-ignore
  @ViewChild(IonSlides) slides: IonSlides;
  loading: any;
  eleve: any;
  _result: any;
  _resultPage: any
  static newNotif: any;

  constructor(
    private navController: NavController,
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private router: Router,

  ) { }

  getPageDat() {
    this.apiservice.get({}, 'login-page')
      .subscribe(
        result => {
          this._resultPage = result;
          console.log(result);
          
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'timeline')
      .subscribe(
        result => {
          this._result = result;
          console.log(result);
          
          if (this.loading)
            this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      );
  }

  ngOnInit(): void {
    this.getData();

  }

  ionViewDidLoad() {
    this.presentLoadingCustom();
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

  post(post: any) {
    this.navController.navigateRoot(['/eleve/nouveautes'], {
      queryParams: {
        post: post
      }
    });
    // this.router.navigate(['/eleve/nouveautes'], {
    //   queryParams:{
    //     post : post
    //   }
    // });
  }

  messages() {
    // this.navCtrl.setRoot(MessagesPage);
    this.router.navigate(['/eleve/messages']);
  }

  ressources(unite:any) {
    // this.navCtrl.setRoot(RessourcesPage);
    this.navController.navigateRoot(['/eleve/ressource'],{
      queryParams: {
        unite: unite
      }
    });
  }

  album(post: any) {
    // this.navCtrl.setRoot(PostPhotoElevePage);
    console.log('open post ', post)
    this.navController.navigateRoot(['/eleve/album-photo'], {
      queryParams: {
        post: post
      }
    });
  }
  demandes(demande: any) {
    // this.navCtrl.setRoot(DemandesPage);
    this.navController.navigateRoot(['/eleve/demandes'],{
      queryParams: {
        resource: demande
      }
    });
  }

  checkoutEnfant() {
    // this.navCtrl.push(CheckoutEnfantPage);
    this.router.navigate(['/eleve/checkout-enfant']);
  }


}
