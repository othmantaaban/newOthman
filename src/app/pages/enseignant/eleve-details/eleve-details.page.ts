import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-eleve-details',
  templateUrl: './eleve-details.page.html',
  styleUrls: ['./eleve-details.page.scss'],
})
export class EleveDetailsPage implements OnInit {

  loading: any;
  result: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public ft: FileService
  ) { }

  ionViewDidLoad() {
  }
  
  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      duration: 3000000
    });
    this.loading.present();
  }


  getData(): void {

    let params = {
      enseignant_id: this.authservice.enseignant,
      eleve: this.route.snapshot.queryParamMap.get('eleve')
    };

    this.apiSerivce.get(params, 'prof_eleve_details')
      .subscribe(
        result => {
          this.result = result;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          console.log("Error :: " + error);
        }
      )
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  public downloadFile(fileName:any, filePath:any) {
    this.ft.downloadFile(filePath,fileName);
  } 

  goBack() {
    this.navCtrl.pop();
  }
}
