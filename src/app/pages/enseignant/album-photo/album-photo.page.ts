import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.page.html',
  styleUrls: ['./album-photo.page.scss'],
})
export class AlbumPhotoPage implements OnInit {

  showModal:boolean = false;

  _result: any;
  loading: any;
  type: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute
  ) {
    this.type = this.route.snapshot.queryParamMap.get('type');
   }

   getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token,
      }, 'prof_album_photo')
        .subscribe(
            result => {
              this._result = result;
              this.loading.dismiss();
            },
            error => console.log("Erreur :: " + error)
        )
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
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

  toggleModal(){
    this.showModal = !(this.showModal)?true:false;
  }

  albumForm(id:any = null) {
    if(id)
      this.navCtrl.navigateForward(['/enseignant/album-photo-form'],{
        queryParams: { id: id }
      });
    else
    this.navCtrl.navigateForward(['/enseignant/album-photo-form']);
  }

  pagePlaning() {
    this.navCtrl.navigateForward(['/enseignant/planning']);
  }

}
