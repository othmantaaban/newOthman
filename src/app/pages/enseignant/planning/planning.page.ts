import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage {
  eleve: any;
  currentJustify = 'justified';
  results: any;
  loading: any;
  showModal: boolean = false;
  showModalProfil: boolean = false;
  isParent: boolean = false;
  isPick: boolean = false;
  isAdmin: boolean = false;
  // doubleAccount: boolean = true;
  // tripleAccount: boolean = true;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toast : ToastController,
    private route : ActivatedRoute
  ) {

    this.isParent = this.authservice.parent;
    this.isPick = this.authservice.pick;
    this.isAdmin = this.authservice.admin;
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.presentLoadingCustom().then(()=>{
      this.apiservice
        .get(
          {
            enseignant_id: this.authservice.enseignant,
            key: this.authservice.token,
          },
          'prof_cours'
        )
        .subscribe(
          (results) => {
            this.results = results;
            // this.tripleAccount = this.results.acces_transport;
            this.loading.dismiss();
            this.createToast()
          },
          (error) => console.log('Error :: ' + error)
        );
    });

  }

  next(next_date: any) {
    this.presentLoadingCustom();
    this.apiservice
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          next_week: next_date,
        },
        'prof_cours'
      )
      .subscribe(
        (results) => {
          this.results = results;
          this.loading.dismiss();
        },
        (error) => console.log('Error :: ' + error)
      );
  }

  prev(prev_date: any) {
    this.presentLoadingCustom();
    this.apiservice
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          last_week: prev_date,
        },
        'prof_cours'
      )
      .subscribe(
        (results) => {
          this.results = results;
          this.loading.dismiss();
        },
        (error) => console.log('Error :: ' + error)
      );
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

  toggleModal() {
    this.showModal = !this.showModal ? true : false;
  }

  toggleModalProfil() {
    this.showModalProfil = !this.showModalProfil ? true : false;
  }

  badging() {
    this.navCtrl.navigateForward(['/enseignant/qr-badging']);
  }

  coursDetails(event: any, cours: any) {
    event.stopPropagation();
    this.navCtrl.navigateForward(['/enseignant/cours'], {
      queryParams: {
        cours: JSON.stringify(cours),
      }
    });
  }

  devoirsList() {
    this.navCtrl.navigateForward(['/enseignant/devoirs'], {
      queryParams: {
        type: 'devoir',
      }
    });
  }

  ressourcesList() {
    //this.navCtrl.push(ProfContentsPage);

    this.navCtrl.navigateForward(['/enseignant/devoirs'], {
      queryParams: {
        type: 'ressource',
      }
    });
  }

  moncompte() {
    this.navCtrl.navigateForward(['/enseignant/compte']);
  }

  examensList() {
    this.navCtrl.navigateForward(['/enseignant/examens']);
  }

  news() {
    this.navCtrl.navigateForward(['/enseignant/nouveautes']);
  }

  albumPhoto() {
    this.navCtrl.navigateForward(['/enseignant/album-photo']);
  }

  demandeInterne() {
    // this.navCtrl.navigateForward(DemandeInternePage);
    this.navCtrl.navigateForward(['/enseignant/demandes']);
  }

  competences() {
    this.navCtrl.navigateForward(['/enseignant/competences']);
  }

  appreciations() {
    this.navCtrl.navigateForward(['/enseignant/appreciations']);
  }

  messagerie() {
    this.navCtrl.navigateForward(['/enseignant/messages']);
  }

  switchToParent() {
    // this.events.publish('user:changetoparent');
    // this.navCtrl.navigateRoot(['/parent']);
    this.authservice.goToHome('parent')
  }

  switchToAdmin() {
    // this.events.publish('user:changetoparent');
    this.authservice.goToHome('admin')
  }

  switchToTransport() {
    // this.events.publish('user:changetotransport');
    // this.navCtrl.navigateRoot(['/pick']);
    this.authservice.goToHome('pick')
  }

  classesList() {
    this.navCtrl.navigateForward(['/enseignant/classes']);
  }

  goToPage(page: any){
    
    this.navCtrl.navigateRoot([page.path],{
      queryParams: (page.queryParams||{})
    });

  }

  logout() {
    this.authservice.logout();
  }


  createToast() {
    let val = this.route.queryParams.subscribe(async (elt : any)=> {
      try {
        let data = JSON.parse(elt?.data)
        if(data) {
          let t = await this.toast.create(      
          {
            message: data?.message,
            duration: 1500,
            position: "top",
            cssClass: "toast-green"
          }
          )
          await t.present()
        }
      } catch (error) {
        
      }
    })
  }
}
