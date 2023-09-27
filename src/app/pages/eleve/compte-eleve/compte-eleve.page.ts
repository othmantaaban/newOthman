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
    
            console.log(result);
            // this.eleve = ;
          if (this._result.eleve)
            this.eleve = this._result.eleve;
            console.log(this.eleve);
            
            this.formGroup = this.formBuilder.group({
              sexe: [Boolean(+this.eleve?.sexe) ? "Homme" : "Femme", Validators.required],
              nom: [this.eleve?.nom, Validators.required],
              prenom: [this.eleve?.prenom, Validators.required],
              nomar: [this.eleve?.nomAr ? this.eleve.nomAr : '', Validators.nullValidator],
              prenomar: [this.eleve?.prenomAr? this.eleve.prenomAr: '', Validators.nullValidator],
              datenaissance: [this.eleve?.date ? this.eleve.date : null, Validators.required],
              tel: [
                this.eleve?.tel, [Validators.nullValidator]
              ],
              email: [
                this.eleve?.email, [Validators.nullValidator, Validators.email]
              ]
            });

            if (this._result.can_not_eleve_edit_profile) {
              // this.disbaleInput();
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
    console.log("hello");
    
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
    console.log(this.formGroup);
    
    
    this.apiSerivce.post({
      user_id : this.authservice.user,
      parent_id : this.parentservice.parentId,
      eleve_id : this.parentservice.currentEleve.id,
      key  : this.authservice.token,
      sexe : this.formGroup.get("sexe")?.value,
      datenaissance : this.formGroup.get("datenaissance")?.value,
      nom : this.formGroup.get("nom")?.value,
      prenom : this.formGroup.get("prenom")?.value,
      nomar : this.formGroup.get("nomar")?.value,
      prenomar : this.formGroup.get("prenomar")?.value,
      tel : this.formGroup.get("tel")?.value,
      email : this.formGroup.get("email")?.value,
      photo : this.photo
    }, 'compte-eleve').subscribe(
      (result: any) => {

        this.navCtrl.navigateRoot(['/eleve/mon-compte'],
          {
            queryParams: {
              data: JSON.stringify(result)
            }
          } 
        );

      },
      (error: any) => {

        alert(error);
        console.log("Error :: " + error);
        this.loading.dismiss().catch();
      }
    );
  }

  disbaleInput() {
    
    this.formGroup.get('sexe')?.disable();
    this.formGroup.get('nom')?.disable();
    this.formGroup.get('prenom')?.disable();
    this.formGroup.get('nomar')?.disable();
    this.formGroup.get('prenomar')?.disable();
    this.formGroup.get('datenaissance')?.disable();
    this.formGroup.get('tel')?.disable();
    this.formGroup.get('email')?.disable();
  }


}
