import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';


@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.page.html',
  styleUrls: ['./bibliotheque.page.scss'],
})
export class BibliothequePage implements OnInit {

  eleve:any;
  _result: any;
  loading: any;
  unites: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private router : Router
    ) { }

  
  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'bibliotheque')
        .subscribe(
            result => {
              this._result = result;
             this.unites = this._result.unites;
             this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        )
  }

  ionViewDidLoad() {
  }
  
  async ngOnInit(): Promise<void> {
    await this.presentLoadingCustom();
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

  unitePost(unite: any) {
    console.log(unite);
    this.router.navigate(['/parent/ressource'],{
     queryParams:{
       unite: unite
     } 
    })
    // this.navCtrl.push(RessourcesUnitePage, {
    //   unite : unite
    // });
  }

}
