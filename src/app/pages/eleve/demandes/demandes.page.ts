import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {

  eleve:any;
  _result: any;
  loading: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  getData(): void {

    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'demandes')
        .subscribe(
            result => {
              this._result = result;
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
    this.router.navigate(['/eleve/nouvelle-demande']);
    // this.navCtrl.push(NouvelleDemandePage);
  }


  detail_demande(demande: any){
    this.router.navigate(['/eleve/demande'],{
      queryParams: {
        demande:JSON.stringify(demande),
        translation:JSON.stringify(this._result.translation)
      }
    })
    // this.navCtrl.push(DetailsDemandePage,{demande:demande,translation:this._result.translation});
  }

  getColor(etat: any){
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
