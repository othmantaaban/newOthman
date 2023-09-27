import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

  prof: any;
  _result: any;
  loading: any;
  // @ts-ignore: Unreachable code error
  formGroup: FormGroup;

  nom: any = null;
  prenom: any = null;
  email: any = null;
  tel: any = null;
  sexe: any = null;
  photo: any = null;
  adresse: any = null;
  lang: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    
    this.formGroup = this.formBuilder.group({
      sexe : ['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      tel : ['', Validators.nullValidator],
      email : ['', Validators.nullValidator],
      adresse : ['', Validators.nullValidator],
      lang : ['fr', Validators.required],
    });

  }

  getData(): void {
    this.apiSerivce.get({
      user_id : this.authservice.user,
      enseignant_id: this.authservice.enseignant,
      key  : this.authservice.token,
    }, 'compte-prof')
      .subscribe(
        result => {
          this._result = result;
          this.prof = this._result.prof;

          if(this.prof.nom)
            this.nom = this.prof.nom;
          if(this.prof.prenom)
            this.prenom = this.prof.prenom;
          if(this.prof.email)
            this.email = this.prof.email;
          if(this.prof.tel)
            this.tel = this.prof.tel;
          if(this.prof.img)
            this.photo = this.prof.img;
          if(this.prof.sexe){
            console.log(this.prof.sexe);
            this
            .sexe = this.prof.sexe;
          }
          this.lang = this.prof.lang;

          this.disbaleInput();

          this.loading.dismiss();
        },
        error => {
          console.log("Error :: " + error);
          this.loading.dismiss();
        }
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

  async cropImage() {
    // const options: CameraOptions = {
    //   quality: 70,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum: false,
    //   allowEdit: true,
    //   targetWidth: 400,
    //   targetHeight: 400
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   this.photo = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });
    const permission = await Camera.checkPermissions()
    if( permission.photos != 'granted' || permission.camera != 'granted' )
    await Camera.requestPermissions()


    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false,
      height: 400,
      width: 400,
    });
    
    console.log('image : ',image)
    this.photo = image.dataUrl;
  }

  send() {


    // let query = "sexe=" + this.sexe +
    //   "&lang=" + this.lang +
    //   "&parent_id=" + ApiService.parentId +
    //   "&key=" + ApiService.keyToken
    //   + "&email=" + this.email
    //   ;


    // if (this.nom)
    //   query += "&nom=" + this.nom;
    // if (this.prenom)
    //   query += "&prenom=" + this.prenom;

    // if (this.tel)
    //   query += "&tel=" + this.tel;

    // if (this.photo != this.parent.img)
    //   query += "&photo=" + this.photo;

    // if (this.adresse)
    //   query += "&adresse=" + this.adresse;
    let query: any = {
      user_id : this.authservice.user,
      enseignant_id : this.authservice.enseignant,
      key  : this.authservice.token,
      sexe : this.sexe,
      lang : this.lang,
      email: this.email,
      nom : this.nom,
      prenom : this.prenom,
      tel : this.tel,
      adresse: this.adresse
    };


    if (this.photo != this.prof.img)
      query.photo = this.photo;

    this.apiSerivce.post(query, 'compte-prof').subscribe(
      result => {
        // this.events.publish('compte:check');
        this._result = result;
        if (this._result.error === true) {
          this.sendNotification(this._result.msg, 'toast-error');
        }
        else {
          this.router.navigate(['/enseignant']);
        }

      },
      error => {

        //alert(error);
        console.log("Error :: " + error);
        //this.loading.dismiss().catch();
      }
    );
  }


  disbaleInput() {
    this.formGroup.get("sexe")?.disable()
    this.formGroup.get("sexe")?.disable()
    
    this.formGroup.get('nom')?.disable()
    this.formGroup.get('prenom')?.disable()
    this.formGroup.get('tel')?.disable()
    this.formGroup.get('email')?.disable()
    // this.formGroup.controls.nom.disable();
    // this.formGroup.controls.prenom.disable();
  }

  async sendNotification(message: any, classe: any) {
    let notification = await this.toastCtrl.create({
      message: message,
      duration: 100000,
      cssClass: classe,
      position: 'middle',
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });
    notification.present();
  }
}
