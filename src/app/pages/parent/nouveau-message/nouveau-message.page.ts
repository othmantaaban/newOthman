import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-nouveau-message',
  templateUrl: './nouveau-message.page.html',
  styleUrls: ['./nouveau-message.page.scss'],
})
export class NouveauMessagePage {
  public sujet: any;
  public translation: any;
  public message: any;
  public theme	: any;
  public themes: any;
  public eleve: any;
  public eleves: any;
  public messageRef: any;
  // @ts-ignore: Unreachable code error
  public formGroup: FormGroup;
  // @ts-ignore: Unreachable code error
  public fileMessage: any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private plt: Platform,
    private toastCtrl: ToastController

  ) {
    this.formGroup = this.formBuilder.group({
      sujet: ['', Validators.nullValidator],
      message: ['', Validators.required],
      theme: ['', Validators.required],
      eleve: ['', Validators.required],
    });

    this.messageRef = this.route.snapshot.queryParamMap.get('messageRef');
    if(this.messageRef){
      this.messageRef = JSON.parse(this.messageRef);
    }
    this.sujet = this.route.snapshot.queryParamMap.get('sujet');
    this.translation = this.route.snapshot.queryParamMap.get('translation');
    if(this.translation){
      this.translation = JSON.parse(this.translation);
    }
    this.themes = this.route.snapshot.queryParamMap.get('themes');
    if(this.themes){
      this.themes = JSON.parse(this.themes);
    }
    // console.log(navParams.get('themes'))
    this.eleves = this.parentservice.eleves;
    this.eleve = this.parentservice.currentEleve;
   }

  

   ionViewDidLoad() {
    console.log('yes', this.fileMessage);
  }

  
deleteFile() {
  this.fileMessage = null;
}

  send()
  {

    let query = {
      sujet: this.sujet , 
      message: this.message , 
      theme: this.theme , 
      eleve: this.eleve , 
      file: JSON.stringify(this.fileMessage) ,
      eleve_id: this.parentservice.currentEleve.id , 
      parent_id: this.parentservice.parentId ,
      user_id: this.authservice.user ,
      key: this.authservice.token
    };
                
    if (this.messageRef){
      // @ts-ignore: Unreachable code error
          query.ref = this.messageRef;
    }

      this.apiservice.post(query, 'nouveau-message').subscribe(
        result => { 

          this.router.navigate([this.route.parent?.url])
  
        }, 
        error =>  {

          //alert(error);
          console.log("Error :: " + error);
          //this.loading.dismiss().catch();
        }
    );
  }
  
  // unsed
  chooseFile() {
    if (this.plt.is("ios")) {
      this.chooseFileForIos();
    } else {
      this.chooseFileForAndroid();
    }
  }
 // unsed
  chooseFileForIos() {
    // this.filePicker
    //   .pickFile()
    //   .then(uri => {
    //     this.presentToast("File chosen successfully");
    //     this.convertToBase64(uri,false)
    //   })
    //   .catch(err => console.log("Error", err));
  }
 // unsed
  chooseFileForAndroid() {
    // this.fileChooser
    //   .open()
    //   .then(uri => {
    //     this.presentToast("File chosen successfully");
    //     this.convertToBase64(uri,false)
    //   })
    //   .catch(e => {
    //   });
  }
 // unsed
  convertToBase64(imageUrl: any, isImage: any) {
    // this.filePath
    //   .resolveNativePath(imageUrl)
    //   .then(filePath => {
    //     this.base64.encodeFile(filePath).then(
    //       (base64Fichier: string) => {
    //         let fileName = filePath.substring(filePath.lastIndexOf('/')+1, filePath.length);
    //         this.fileMessage = {
    //           name: fileName,
    //           extention: filePath.split(".").pop(),
    //           base64File: base64Fichier.split(",").pop()
    //         };
    //       },
    //       err => {
    //       }
    //     );
    //   })
    //   .catch(err => console.log(err));
  }


  uploadFile(event:any) {

    if (event.target.length === 0) {
      return null;
    }
    const file = event.target.files[0];
    const mb = 1048576;
    if( file.size > mb) {
      this.presentToast("S'il vous plait choisi un fichier moins ou egale 1MB");
      return null;
    }
    const fileName = file.name
    const extension = fileName.slice(file.name.lastIndexOf(".") + 1);
    // this.toBase64(file).then((res: string) => {
    //     this.fileMessage = {
    //       name: fileName,
    //       extention: extension,
    //       base64File: res,
    //     }
    //     this.presentToast("Fichier choisi avec succès");
    // });
    return null;
  }
  
  toBase64(file: any) {
    // return (new Promise((resolve, reject) => {
    //   const reader = this.getFileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = error => reject(error);
    // }));
  }

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }


  async presentToast(message:any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
  
    toast.present();
  }


}
