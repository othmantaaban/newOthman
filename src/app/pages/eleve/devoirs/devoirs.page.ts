import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-devoirs',
  templateUrl: './devoirs.page.html',
  styleUrls: ['./devoirs.page.scss'],
})
export class DevoirsPage implements OnInit {

  eleve:any;
  loading: any;
  _result: any;
  _resultFile: any;
  selectedDevoir: any;
  // private fileTransfer: any;
  // public fileFormat: { name: any; extention: any; base64File: string };

  constructor(
    private navCtrl: NavController,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private router: Router,
  ) { }


  getData(): void {
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'devoirs')
      .subscribe(
        result => {
          this._result = result;
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  getInnerHTMLValue(result: any) {
    return this.sanitizer.bypassSecurityTrustHtml(result.description);
  }


  public downloadFile(fileName: any, filePath: any) {
    //here encoding path as encodeURI() format.  
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

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  ionViewDidLoad() {
  }

  marquerFait(devoir: any) {
    this.send_file(devoir);
  }

  deleteFile(devoir: any, file: any) {
    const index: number = devoir.devoir_fait.files.indexOf(file);
    if (index !== -1) {
      devoir.devoir_fait.files.splice(index, 1);
    }
  }

  send_file(devoir: any) {
    let query = "&eleve_id=" + this.eleve.id +
      "&user_id=" + this.authservice.user + "&parent_id=" + this.authservice.parent +
      "&key=" + this.authservice.token +
      "&devoir=" + JSON.stringify({ id: devoir.id, files: devoir.devoir_fait.files })
      ;

    this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
    }).then((loading)=>{
      loading.present();
      this.apiSerivce.post(query, 'devoirs_date_v2').subscribe(
        async (result) => {
  
          let res: any = result;
          if (res.file_sent) {
            devoir.devoir_fait.file_sent = true;
            console.log(devoir);
          } else {
            devoir.devoir_fait.fait = true;
          }
          loading.dismiss();
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti',
            header: res.title,
            message: res.message,
            buttons: [{
              text: 'Fermer',
              role: 'cancel',
              handler: () => {
              }
            }]
          });
          alert.present();
        },
        error => {
          this.loading.dismiss();
        }
      );

    });

  }

  chooseFile(devoir: any) {
    if (this.platform.is("ios")) {
      this.chooseFileForIos(devoir);
    } else {
      this.chooseFileForAndroid(devoir);
    }
  }

  chooseFileForIos(devoir: any) {
    // this.filePicker
    //   .pickFile()
    //   .then(uri => {
    //     this.presentToast("File chosen successfully");
    //     this.convertToBase64(devoir, uri, false)
    //   })
    //   .catch(err => console.log("Error", err));
  }

  chooseFileForAndroid(devoir: any) {
    // this.fileChooser
    //   .open()
    //   .then(uri => {
    //     this.presentToast("File chosen successfully");
    //     this.convertToBase64(devoir, uri, false)
    //   })
    //   .catch(e => {
    //   });
  }

  convertToBase64(devoir: any, imageUrl: any, isImage: any) {
    // this.filePath
    //   .resolveNativePath(imageUrl)
    //   .then(filePath => {
    //     this.base64.encodeFile(filePath).then(
    //       (base64Fichier: string) => {
    //         let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
    //         this.fileFormat = {
    //           name: fileName,
    //           extention: filePath.split(".").pop(),
    //           base64File: base64Fichier.split(",").pop()
    //         };
    //         devoir.devoir_fait.files.push(this.fileFormat);
    //         this.fileFormat = null;
    //       },
    //       err => {
    //       }
    //     );
    //   })
    //   .catch(err => console.log(err));
  }

  uploadFile(event: any) {

    console.log(this.selectedDevoir);

    if (event.target.length === 0) {
      return;
    }
    const file = event.target.files[0];
    const fileName = file.name
    const extension = fileName.slice(file.name.lastIndexOf(".") + 1);
    this.toBase64(file).then((res) => {
      let fileFormat = {
        name: fileName,
        extention: extension,
        base64File: res,
      }
      this.selectedDevoir.devoir_fait.files.push(fileFormat);
      this.presentToast("Fichier choisi avec succès");
    });
  }

  toBase64(file: any): Promise<any> {
    return (new Promise((resolve, reject) => {
      const reader = this.getFileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }));
  }

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }

  async presentToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
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


  getDevoirColor(devoir: any) {

    let pastDay = false;

    let now = new Date().toISOString().split('T')[0];
    if (devoir.date.split(' ')[0] < now)
      pastDay = true;


    if (!devoir.devoir_fait.fait) {
      return pastDay ? '#dc3545' : '#ffc107';
    }

    if (devoir.devoir_fait.fait || devoir.devoir_fait.file_sent) {
      return '#66c766';
    }


    return 'grey';

  }

  getDevoirIcon(devoir: any) {

    let pastDay = false;

    let now = new Date().toISOString().split('T')[0];
    if (devoir.date.split(' ')[0] < now)
      pastDay = true;

    if (!devoir.devoir_fait.fait) {
      return pastDay ? 'assets/icon/error-white.svg' : 'assets/icon/waiting-white.svg';
    }

    if (devoir.devoir_fait.fait || devoir.devoir_fait.file_sent) {
      return 'assets/icon/check-white.svg';
    }


    return '';

  }

  openDevoir(devoir:any) {
    this.navCtrl.navigateRoot(['/eleve/devoir'],{
      queryParams: {
        id : devoir.id
      }
    })
    // this.navCtrl.push(DevoirDetailsPage, {
    //   id: devoir.id
    // });
  }
}
