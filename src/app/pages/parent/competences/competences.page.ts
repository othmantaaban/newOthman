import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.page.html',
  styleUrls: ['./competences.page.scss'],
})
export class CompetencesPage implements OnInit {

  _result: any;
  loading: any;
  eleve:any;

  constructor(
    private apiSerivce : ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'competences')
        .subscribe(
            result => {
              console.log(result);

              this._result = result;
              this.loading.dismiss();

            } , error => console.log("Erreur :: " + error)
        )
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();
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

}
