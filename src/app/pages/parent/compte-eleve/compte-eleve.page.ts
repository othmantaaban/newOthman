import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

@Component({
  selector: 'app-compte-eleve',
  templateUrl: './compte-eleve.page.html',
  styleUrls: ['./compte-eleve.page.scss'],
})
export class CompteElevePage implements OnInit {

  eleve: any;
  _result: any;
  loading: any;
  // @ts-ignore: Unreachable code error
  formGroup: FormGroup;

  nom: any = null;;
  loadingBlur: any = null;
  prenom: any = null;
  nomar: any = null;
  prenomar: any = null;
  email: any = null;
  tel: any = null;
  datenaissance: any = null;
  sexe: any = null;
  photo: any = null;

  constructor(
    private navCtrl: NavController,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,

  ) {

    this.eleve = this.route.snapshot.queryParamMap.get('eleve');
    if (this.eleve)
      this.eleve = JSON.parse(this.eleve);

    this.formGroup = this.formBuilder.group({
      sexe: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      nomar: ['', Validators.nullValidator],
      prenomar: ['', Validators.nullValidator],
      datenaissance: ['', Validators.required],
    });

    this.datenaissance = this.eleve.datenaissance;
    if (this.eleve.nom)
      this.nom = this.eleve.nom;
    if (this.eleve.prenom)
      this.prenom = this.eleve.prenom;
    if (this.eleve.nomar)
      this.nomar = this.eleve.nomar;
    if (this.eleve.prenomar)
      this.prenomar = this.eleve.prenomar;
    if (this.eleve.img)
      this.photo = this.eleve.img;
    if (this.eleve.sexe)
      this.sexe = this.eleve.sexe;

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

  getData(): void {

    this.apiSerivce.get({
      user_id : this.authservice.user,
      parent_id : this.parentservice.parentId,
      key  : this.authservice.token,
    }, 'compte-eleve')
      .subscribe(
        result => {
          this._result = result;
          if (this._result.can_not_eleve_edit_profile) {
            this.disbaleInput();
          }

          this.loading.dismiss();
          this.loadingBlur = null;
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
    })
  }

  async cropImage() {
    // const options: CameraOptions = {
    //   quality: 60,
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
    // let query = "datenaissance=" + this.datenaissance +
    //   "&sexe=" + this.sexe +
    //   "&eleve_id=" + this.eleve.id +
    //   "&parent_id=" + ApiService.parentId +
    //   "&key=" + ApiService.keyToken
    //   ;


    // if (this.nom)
    //   query += "&nom=" + this.nom;
    // if (this.prenom)
    //   query += "&prenom=" + this.prenom;
    // if (this.nomar)
    //   query += "&nomar=" + this.nomar;
    // if (this.prenomar)
    //   query += "&prenomar=" + this.prenomar;

    // if (this.photo != this.eleve.img)
    //   query += "&photo=" + this.photo;

    this.apiSerivce.post({
      user_id : this.authservice.user,
      parent_id : this.parentservice.parentId,
      eleve_id : this.parentservice.currentEleve.id,
      key  : this.authservice.token,
      sexe : this.sexe,
      datenaissance : this.datenaissance,
      nom : this.nom,
      prenom : this.prenom,
      nomar: this.nomar,
      prenomar: this.prenomar,
      photo : this.photo
    }, 'compte-eleve').subscribe(
      result => {

        // this.router.navigate(['/parent/mon-compte'])
        this.navCtrl.navigateRoot(['/parent/mon-compte']);

      },
      error => {

        //alert(error);
        console.log("Error :: " + error);
        //this.loading.dismiss().catch();
      }
    );
  }

  disbaleInput() {

    this.formGroup.get('nom')?.disable();
    this.formGroup.get('prenom')?.disable();
    this.formGroup.get('nomar')?.disable();
    this.formGroup.get('prenomar')?.disable();
    this.formGroup.get('datenaissance')?.disable();
  }

}
