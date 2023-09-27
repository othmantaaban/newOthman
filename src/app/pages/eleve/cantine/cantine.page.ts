import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-cantine',
  templateUrl: './cantine.page.html',
  styleUrls: ['./cantine.page.scss'],
})
export class CantinePage {

  eleve: any;
  currentJustify = 'justified';
  results: any = [];
  loading: any;
  // private fileTransfer: FileTransferObject;
  jours: any;
  activeDay: number = 1;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController
  ) {
    this.eleve = this.parentservice.currentEleve;
    this.jours = {};
   }

  ionViewWillEnter() {
    this.load();
  }

  load() {

    this.presentLoadingCustom().then(()=>{
      this.apiSerivce.get(
        {
          user_id: this.authservice.user,
          parent_id: this.authservice.parent,
          eleve_id: this.parentservice.currentEleve.id,
          key: this.authservice.token,
        }, 'cantine')
        .subscribe(
          (results:any) => {
            this.results = results;
            console.log(this.results);
            this.loading.dismiss();
          }
          ,
          (error:any) => console.log("Error :: " + error)
        )
    });

  }

  next(next_date:any) {
    this.presentLoadingCustom();
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        next_week: next_date
      }, 'cantine')
      .subscribe(
        results => {
          this.results = results;
          this.loading.dismiss();
        }
        ,
        error => console.log("Error :: " + error)
      )
  }

  prev(prev_date:any) {
    this.presentLoadingCustom();
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        last_week: prev_date
      }, 'cantine')
      .subscribe(
        results => {
          this.results = results;
          this.loading.dismiss();
        }
        ,
        error => console.log("Error :: " + error)
      )
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

  // openYoutube(id){
  //   window.InAppYouTube.openVideo(id);
  // }

  public downloadFile(fileName:any, filePath:any) {
    // //here encoding path as encodeURI() format.  
    // let url = encodeURI(filePath);

    // this.fileTransfer = this.transfer.create();

    // let directory = '';
    // if (this.platform.is('cordova')) {
    //   directory = this.file.externalRootDirectory + '/Download/';
    // } else {
    //   directory = this.file.documentsDirectory;
    // }

    // this.androidPermissions.requestPermissions([
    //   this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    // ]).then((result) => {
    //   // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    //   this.fileTransfer.download(url, directory + fileName, true).then((entry) => {
    //     //here logging our success downloaded file path in mobile.  
    //     const alertSuccess = this.alertCtrl.create({
    //       title: `Téléchargement réussi !`,
    //       cssClass: 'notification-alert',
    //       message: `${fileName} a été téléchargé avec succès sur : ${entry.toURL()}`,
    //       buttons: ['Ok']
    //     });

    //     alertSuccess.present();

    //   }, (error) => {
    //     //here logging our error its easier to find out what type of error occured.  
    //     console.log('download failed: ' + error);
    //   });
    // });

  }
}
