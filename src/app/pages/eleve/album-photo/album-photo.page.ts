import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.page.html',
  styleUrls: ['./album-photo.page.scss'],
})
export class AlbumPhotoPage implements OnInit {

  _result: any;
  loading: any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'album_photo')
        .subscribe(
            result => {
              this._result = result;

              if (this.route.snapshot.queryParamMap.has('resource')) {
                this._result.data.forEach((post: any) => {
                  let paramID = this.route.snapshot.queryParamMap.get('resource')
                  console.log(`open post ${paramID}`)
                  if (paramID == post.id) {
                    this.router.navigate(['/eleve/post'], {
                      queryParams: {
                        result: JSON.stringify(post)
                      }
                    });
                  }
                });
              }
              // console.log(this._result);
              this.loading.dismiss();
            }
              ,
            error => console.log("Erreur :: " + error)
        )
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    })
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
  
  post(post: any) {
    console.log(post)
    this.router.navigate(['/eleve/album-photo-item'], {
      queryParams: {
        result: JSON.stringify(post)
      }
    });

    //   this.navCtrl.push(PostPage, {
    //     result : post
    //   });
  }

}
