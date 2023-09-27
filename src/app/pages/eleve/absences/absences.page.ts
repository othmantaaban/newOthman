import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonSlides, LoadingController, Platform, ToastController } from '@ionic/angular';
import { FileService } from 'src/app/services/file.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DayConfig , CalendarComponentOptions } from 'ion2-calendar'
@Component({
  selector: 'app-absences',
  templateUrl: './absences.page.html',
  styleUrls: ['./absences.page.scss'],
})
export class AbsencesPage implements OnInit {
  // @ts-ignore: Unreachable code error
  @ViewChild('mySlider') slider: IonSlides;
  @ViewChild('content') private content: any;

  selected_date: any;

  calendarOptions : CalendarComponentOptions = {};

  selected_absences : any = null;

  formGroup : FormGroup;

  public selected = 0;
  public indicator = null;
  public mySlideOptions = {};
  eleve:any;
  loading: any;
  _result: any;
  _toggleJustification:boolean = false;
  currentAbsence: any;
  // @ts-ignore: Unreachable code error
  imageArr: any;
  motifAbsence: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private fileservice: FileService
  ) { 

    this.platform = platform;
    this.eleve = this.parentservice.currentEleve;

    
    this.formGroup = this.formBuilder.group({
      motif: ['', Validators.required],
    });
  }


  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'absences')
      .subscribe(
        result => {
          this._result = result;

          let absencesDays : DayConfig[] = [];
      
          if(result.actions){
            for (let index = 0; index < result.actions.length; index++) {
              const element = result.actions[index];
              absencesDays.push({
                date: new Date(element.year, element.month, element.day),
                cssClass: 'hasEvent',
              });
            }
          }

          this.calendarOptions = {
            daysConfig: absencesDays,
            from: new Date((new Date().getFullYear()-1), 8, 1),
            to: (new Date()),
            showMonthPicker: false
          };
          console.log('absence: ',result)
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
      // this.slider.lockSwipes(true);
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

  toggleJustification(absence: any = null) {
    if (!this._toggleJustification) {
      this.currentAbsence = absence;
      this.motifAbsence = absence.justificationmotif;
    } else {
      this.currentAbsence = null;
    }
    this._toggleJustification = !this._toggleJustification;
  }

  submit(absence: any) {

    absence.image = this.imageArr;
    // let query = "eleve_id=" + this.eleve.id +
    //   "&user_id=" + this.authservice.user + "&parent_id=" + this.parentservice.parentId +
    //   "&key=" + this.authservice.token +
    //   "&absence=" + JSON.stringify(absence)
    //   ;

    let query = {
      eleve_id: this.eleve.id,
      user_id: this.authservice.user,
      parent_id: this.parentservice.parentId,
      key: this.authservice.token,
      absence: JSON.stringify(absence),
    };

    this.apiSerivce.post(query, 'absences-justification').subscribe(
      async (result) => {
        let res: any = result;
        
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
  }

  checkJustification() {
    this._toggleJustification = false;
    this.currentAbsence.justificationmotif = this.motifAbsence;
    this.submit(this.currentAbsence);
    this.currentAbsence = null;
    this.motifAbsence = null;
  }


  convertToBase64(imageUrl:any, isImage:any) {
    this.fileservice.base64FromPath(imageUrl).then((base64Fichier: string)=>{
      this.imageArr = {
        extention: imageUrl.split(".").pop(),
        base64Img: base64Fichier.split(",").pop()
      }
    })
    // this.filePath
    //   .resolveNativePath(imageUrl)
    //   .then(filePath => {
    //     this.base64.encodeFile(filePath).then(
    //       (base64Fichier: string) => {
    //         this.imageArr = {
    //           extention: filePath.split(".").pop(),
    //           base64Img: base64Fichier.split(",").pop() //same comment for image follows here.
    //         }
    //       },
    //       err => {
    //       }
    //     );
    //   })
    //   .catch(err => console.log(err));
  }


  async presentToast(message:any) {
    let toast = await  this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });


    toast.present();
  }

  async openGallery() {
    const permission = await Camera.checkPermissions()
    if( permission.photos != 'granted' || permission.camera != 'granted' )
    await Camera.requestPermissions()


    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      saveToGallery: true
    });
    
    console.log('image : ',image)
    
    this.imageArr = {
      extention: image.format,
      base64Img: image.base64String
    }
    this.presentToast("Image chosen successfully");

    // var options = {
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.FILE_URI
    // };
    // this.camera
    //   .getPicture(options)
    //   .then(imageData => {
    //     this.presentToast("Image chosen successfully");
    //     this.convertToBase64(imageData, true);
    //   })
    //   .catch(e => {
    //   });
  }

  select(index : any) {
    this.selected = index;
    // this.slider.slideTo(index, 500);
  }

  onSlideChanged($event: any) {
    // if (((($event.touches.startX - $event.touches.currentX) <= 100) || (($event.touches.startX - $event.touches.currentX) > 0)) && (this.slider.isBeginning() || this.slider.isEnd())) {
    //   //console.log("interdit Direction");
    // }
    // else {
    //   //console.log("OK Direction");
    //   //this.indicator.style.webkitTransform = 'translate3d(' + (-($event.translate) / 4) + 'px,0,0)';
    // }

  }

  panEvent() {
    // let currentIndex = this.slider.getActiveIndex();
    // console.log('here' + currentIndex);
    // if (currentIndex === 1) {
    //   this.selected = 1;
    //   //this.indicator.style.webkitTransform = 'translate3d(100%,0,0)';
    // }
    // if (currentIndex === 0) {
    //   this.selected = 0;
    //   //this.indicator.style.webkitTransform = 'translate3d(0%,0,0)';
    // }
  }

  changeSlide(event: any){
    console.log(event, this.selected)
    this.slider.slideTo(this.selected)
  }

  changeAbsenceDate(ev:any){
    let retards = [];
    let absences = [];
    let count_sceance = 0;
    let justifie = true;
    let date_actions = this._result.actions.filter((elem: any)=>{
      if(this.selected_date != elem.date)
      return false;

        count_sceance += elem.seances.length;

        if(justifie&&!elem.justifie)
        justifie = false;

        return true;

    })
    if(date_actions.length == 0){
      this.selected_absences = null
      return;
    }
    retards = date_actions.filter((item:any)=>item.retard)
    absences = date_actions.filter((item:any)=>!item.retard)
    
    this.selected_absences = {
      date : this.selected_date,
      count_sceances : count_sceance,
      retards: retards,
      absences: absences,
      justifie: justifie
    };
    console.log(this.selected_absences)
    setTimeout(() => {
      this.content.scrollToBottom(300)
    }, 100);
  }
}
