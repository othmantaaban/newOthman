import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ParentService } from 'src/app/services/parent.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.page.html',
  styleUrls: ['./devoir.page.scss'],
})
export class DevoirPage implements OnInit {

  devoir: any;

  done: any;

  eleve: any;
  _result: any;
  _resultFile: any;
  // @ts-ignore: Unreachable code error
  _resultFile: any;
  public fileFormat: any;

  constructor(
    private apiService: ApiService,
    private parentservice: ParentService,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private fileservice: FileService
  ) {
    this.eleve = this.parentservice.currentEleve;
  }

  getData(): void {
    this.apiService.get(
      {
        user_id: this.authservice.user,
        parent_id: this.parentservice.parentId,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        devoir: this.route.snapshot.queryParamMap.get('id')
      }, 'devoirs')
      .subscribe(
        result => {
          this.devoir = result;
          console.log(result);
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevoirDetailsPage');
  }

  ngOnInit(): void {
    this.getData();
  }


  marquerFait(event:CustomEvent,devoir: any) {
    if(event.detail.checked != this.devoir.devoir_fait.fait){
      this.send_file(devoir);
    }
  }

  deleteFile(devoir: any, file: any) {
    const index: number = devoir.devoir_fait.files.indexOf(file);
    if (index !== -1) {
      devoir.devoir_fait.files.splice(index, 1);
    }
  }

  send_file(devoir: any) {
    // let query = "&eleve_id=" + this.eleve.id +
    //   "&user_id=" + this.authservice.user + "&parent_id=" + this.parentservice.parentId +
    //   "&key=" + this.authservice.token +
    //   "&devoir=" + JSON.stringify({ id: devoir.id, files: devoir.devoir_fait.files })
    //   ;

    this.apiService.post({
      eleve_id: this.eleve.id ,
      user_id: this.authservice.user , 
      parent_id: this.parentservice.parentId ,
      key: this.authservice.token ,
      devoir: JSON.stringify({ id: devoir.id, files: devoir.devoir_fait.files})
    }, 'devoirs').subscribe(
      async (result) => {

        let res: any = result;
        if (res.file_sent) {
          devoir.devoir_fait.file_sent = true;
          console.log(devoir);
        } else {
          devoir.devoir_fait.file_sent = false;
          devoir.devoir_fait.files = [];
          devoir.devoir_fait.fait = true;
        }
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
      }
    );
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
    //     this.convertToBase64(devoir, uri,false)
    //   })
    //   .catch(err => console.log("Error", err));
  }

  chooseFileForAndroid(devoir: any) {
    // this.fileChooser
    //   .open()
    //   .then(uri => {
    //     this.presentToast("File chosen successfully");
    //     this.convertToBase64(devoir, uri,false)
    //   })
    //   .catch(e => {
    //   });
  }

  convertToBase64(devoir: any, imageUrl: any, isImage: any) {

    this.fileservice.base64FromPath(imageUrl).then((base64)=>{
      let fileName = imageUrl.split('/').pop();
      this.fileFormat = {
        name: fileName,
        extention: fileName.split(".").pop(),
        base64File: base64
      };
      devoir.devoir_fait.files.push(this.fileFormat);
      this.fileFormat = null;
    })

    // this.filePath
    //   .resolveNativePath(imageUrl)
    //   .then(filePath => {
    //     this.base64.encodeFile(filePath).then(
    //       (base64Fichier: string) => {
    //         let fileName = filePath.substring(filePath.lastIndexOf('/')+1, filePath.length);
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

    console.log(this.devoir);

    if (event.target.length === 0) {
      return null;
    }

    const file = event.target.files[0];
    const fileName = file.name
    const extension = fileName.slice(file.name.lastIndexOf(".") + 1);
    return this.toBase64(file).then((res: any) => {
      let fileFormat = {
        name: fileName,
        extention: extension,
        base64File: res,
      }
      this.devoir.devoir_fait.files.push(fileFormat);
      this.presentToast("Fichier choisi avec succès");
    });
  }

  toBase64(file: any) {
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

  downloadFile(file: any) {
    this.fileservice.downloadFile(file.link,file.name)
    // this.ft.downloadFile(file.text, file.link);
  }


  sanitizeUrl(link: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  async iabOpen(link:string){
    return await Browser.open({url:link});
  }

}
