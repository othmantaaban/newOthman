import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nouveautes',
  templateUrl: './nouveautes.page.html',
  styleUrls: ['./nouveautes.page.scss'],
})
export class NouveautesPage implements OnInit {

  _result: any;
  loading: any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  getData(): void {
    this.apiservice.get(
      {
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
      }, 'prof_nouveautes')
      .subscribe(
        result => {
          this._result = result;
          // if post id send it to components  
          if (this.route.snapshot.queryParamMap.has('resource')) {
            this._result.data.forEach((post: any) => {
              let paramID = this.route.snapshot.queryParamMap.get('resource')
              console.log(`open post ${paramID}`)
              if (paramID == post.id) {
                this.router.navigate(['/enseignant/post'], {
                  queryParams: {
                    result: JSON.stringify(post)
                  }
                });
              }
            });
          }
          //end by jamal
          if (this.loading)
            this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      );

    // setTimeout(() => {
    //   this.events.publish('network:type');
    // }, 10000);
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
    console.log(post)
    this.router.navigate(['/enseignant/post'], {
      queryParams: {
        result: JSON.stringify(post)
      }
    });

    //   this.navCtrl.push(PostPage, {
    //     result : post
    //   });
  }



}
