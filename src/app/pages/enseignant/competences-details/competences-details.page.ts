import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, IonSlides, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-competences-details',
  templateUrl: './competences-details.page.html',
  styleUrls: ['./competences-details.page.scss'],
})
export class CompetencesDetailsPage implements OnInit {

  _toggleAppreciation:boolean = false;
  selectedIns: any;
  selectAppreciation: any=null;
  textareaAppreciation: any=null;
  showPopUp: boolean = false;
  _result: any;
  examen: any;
  //@ts-ignore
  @ViewChild(IonSlides) slides: IonSlides;
  loading: any;
  slideIndex:any = 1;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public route: ActivatedRoute,
    private alertCtrl: AlertController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    public actionSheet: ActionSheetController,
    public modalCtrl: ModalController,
  ) {
    //@ts-ignore
    this.examen = JSON.parse(this.route.snapshot.queryParamMap.get('examen'));
  }

  getData(): void {
    this.apiSerivce.get(
      {
        examen_id: this.examen.id,
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
      }, 'prof-competences-details')
      .subscribe(
        result => {
          this._result = result;
          console.log(this._result);
          
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }
  
  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  ionViewDidLoad() {
    //this.presentLoadingCustom();
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

  maxNoteChange(eleve:any) {
    if (eleve.note > this._result.data.max_note) {
      eleve.note = this._result.data.max_note;
    }
  }

  submit() {
    this.presentLoadingCustom();
    this.apiSerivce.post({
      enseignant_id: this.authservice.enseignant , 
      examen_id: this.examen.id , 
      competences: JSON.stringify(this._result.data.competence)
      }, 'prof-competences-details').subscribe(
      async result => {
        let res: any = result;
        // this.navCtrl.setRoot(ProfExamensPage);
        this.loading.dismiss();
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

  previousSlide(){
    this.slides.slidePrev();
  }
  nextSlide(){
    this.slides.slideNext();
  }
  
  async presentlegende(){
    // const modal = await this.modalCtrl.create({
    //   component: asadsadasd
    // });
    // modal.present();
  }

  slideChanged() {
    this.slides.getActiveIndex().then((index)=>{
      this.slideIndex = index+1;
    })
  }

}
