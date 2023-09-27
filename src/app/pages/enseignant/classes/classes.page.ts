import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  _result: any;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public apiSerivce: ApiService,
    private authservice: AuthService,
    public loadingCtrl: LoadingController
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token,
      }, 'prof_classes')
        .subscribe(
            result => {
              this._result = result;
              // this.loading.dismiss();
            },
            error => console.log("Erreur :: " + error)
        )
  }

  ngOnInit(): void {
    // this.presentLoadingCustom();
      this.getData();
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

  pagePlaning() {
    this.navCtrl.navigateRoot(['/enseignant/planning']);
  }
  
  // details_classe(classe){
  //   this.navCtrl.push(ProfClassesTabsPage,{ classe: classe });
  // }

  cahier_transmission(classe:any){
    // this.navCtrl.push(ProfDisciplinePage,{ classe: classe.id });
    this.navCtrl.navigateForward(['/enseignant/transmission'],{ queryParams: {classe: classe.id} });
  }

  eleves(classe:any){
    this.navCtrl.navigateForward(['/enseignant/classe-details'],{ queryParams: {classe: classe.id} });
    // this.navCtrl.push(ProfClasseDetailsPage,{ classe: classe.id });
  }

  absence(classe:any){
    this.navCtrl.navigateForward(['/enseignant/absence'],{ queryParams: {classe: classe.id} });
    // this.navCtrl.push(ProfAbsencesPage,{ classe: classe.id });
  }

}
