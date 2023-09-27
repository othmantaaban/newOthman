import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {

  _result: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public route: ActivatedRoute,
    public loadingCtrl: LoadingController
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token,
      }, 'prof_demandes')
        .subscribe(
            result => {
              this._result = result;
              console.log(this._result);
              
               // if post id send it to components  
               if(this.route.snapshot.queryParamMap.get('resource')){
                this._result.data.forEach((resource:any) => {
                  if(this.route.snapshot.queryParamMap.get('resource')==resource.id){
                      this.detail_demande(resource);
                    }
                 });
                } 
                //end by jamal
                
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

  nouvelleDemande() {
    this.navCtrl.navigateForward(['/enseignant/demandes-form']);
  }

  detail_demande(demande:any){
    console.log(JSON.stringify(this._result.translation));
    
    this.navCtrl.navigateForward(['/enseignant/demandes-details'],{
      queryParams: { demande: JSON.stringify(demande), translation : JSON.stringify(this._result.translation) }
    });
  }
  
  getColor(etat:any){
    switch(etat) { 
      case 'En Cours': { 
          return "en-cours";
          
      } 
      case 'Traitée': { 
          return "cloturee"; 
        
      } 
      case 'Bloquée': { 
          return "refusee"; 
      } 
      case 'Nouvelle': { 
          return "nouvelle";
      } 
      case 'Accepté': { 
          return "accepte";
      }
      case 'Livrée': { 
          return "livree";
      }
      default: { 
        return "en-cours";
      } 
   }
  }


}
