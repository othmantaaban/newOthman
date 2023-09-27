import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.page.html',
  styleUrls: ['./examen.page.scss'],
})
export class ExamenPage implements OnInit {
  _toggleAppreciation: boolean = false;
  selectedIns: any;
  selectAppreciation: any = null;
  textareaAppreciation: any = null;
  showPopUp: boolean = false;
  _result: any;
  examen: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    private alertCtrl: AlertController,
    public apiSerivce: ApiService,
    public route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public actionSheet: ActionSheetController
  ) {
    this.examen = JSON.parse(
      this.route.snapshot.queryParamMap.get('examen') as string
    );
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          examen_id: this.examen.id,
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
        },
        'prof_examens_details'
      )
      .subscribe(
        (result) => {
          this._result = result;
          console.log(this.loading);
          this.loading.dismiss();
        },
        (error) => console.log('Erreur :: ' + error)
      );
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

  async maxNoteChange(eleve: any) {
    if (eleve.note > this._result.data.max_note) {
      const alert = await this.alertCtrl.create({
        header: this._result.translation.alert_max_note_title,
        message: this._result.translation.alert_max_note_message,
        buttons: ['OK'],
      });

      alert.present();

      eleve.note = this._result.data.max_note;
    }
  }

  submit() {
    this.presentLoadingCustom();
    this.apiSerivce
      .post({
        enseignant_id: this.authservice.enseignant ,
        examen_id: this.examen.id ,
        notes: JSON.stringify(this._result.data.eleves)
      }
      ,
        'prof_examens_details'
      )
      .subscribe(
        async (result) => {
          let res: any = result;
          // this.navCtrl.setRoot(ProfExamensPage);
          this.loading.dismiss();
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti',
            header: res.title,
            message: res.message,
            buttons: [
              {
                text: 'Fermer',
                role: 'cancel',
                handler: () => {},
              },
            ],
          });
          alert.present();
        },
        (error) => {
          this.loading.dismiss();
        }
      );
  }

  closeAppreciation() {
    this.textareaAppreciation = null;
    this.selectedIns = null;
    this.selectAppreciation = 'Tres bon travail';
    this._toggleAppreciation = !this._toggleAppreciation;
  }

  toggleAppreciation(index_eleve:any) {
    this.selectedIns = index_eleve;
    this.textareaAppreciation =
      this._result.data.eleves[this.selectedIns].appreciation;
    this._toggleAppreciation = !this._toggleAppreciation;
  }

  async addNote() {
    const prompt = await this.alertCtrl.create({
      header: 'Appréciation de la note :',
      inputs: [
        // {
        //   type: 'select',
        //   name: 'note',
        // },
        {
          name: 'note',
          placeholder: 'saisissez votre appréciation',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log('Saved clicked');
          },
        },
      ],
    });
    prompt.present();
  }

  holdAppreciation() {
    let value = this.textareaAppreciation
      ? this.textareaAppreciation
      : this.selectAppreciation;
    this._result.data.eleves[this.selectedIns].appreciation = value;
    // close modal
    //  this._toggleAppreciation = !this._toggleAppreciation;
    //  this.selectedIns = null;
    console.log(value);
    this.closeAppreciation();
  }

  async presentActionsEleve(index:any) {
    const actionSheet = await this.actionSheet.create({
      header: '',
      buttons: [
        {
          text: this._result.translation.actions_add_appreciation,
          icon: 'add-circle-outline',
          handler: () => {
            this.toggleAppreciation(index);
          },
        },
        {
          text: this._result.translation.actions_marquer_absent,
          icon: 'alert-outline',
          handler: () => {
            this._result.data.eleves[index].absent = true;
          },
        },
        {
          text: this._result.translation.actions_cancel,
          icon: 'close-circle-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }
}
