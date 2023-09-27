import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';


@Component({
  selector: 'app-quizs',
  templateUrl: './quizs.page.html',
  styleUrls: ['./quizs.page.scss'],
})
export class QuizsPage implements OnInit {

  eleve:any;
  _result: any;
  loading: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'ressources_v2')
        .subscribe(
            result => {
              this._result = result;
              this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        )
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

  quiz(quiz_id: number, matiere_id: number) {
    this.router.navigate(['/eleve/quiz'],{
      queryParams:{
        quiz_id : quiz_id,
      matiere_id : matiere_id
      }
    })
    // this.navCtrl.push(QuizPage, {
    //   quiz_id : quiz_id,
    //   matiere_id : matiere_id
    // });
  }

}
