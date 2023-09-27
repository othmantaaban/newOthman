import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.page.html',
  styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {

  _toggleRetard:boolean = false;
  _toggleDiscipline:boolean = false;
  showPopUp:boolean = false;
  _result: any;
  cours: any;
  currentEleve: any;
  loading: any;
  retardMinutes: any;
  typeDisciplineId: any;
  commentaireDiscipline: any;
  typeDiscipline: any;
  aucuneAbsence: any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  togglesPopUp() {
    this._toggleRetard = false;
    this.showPopUp = !this.showPopUp ? true : false;
  }
  // @ts-ignore
  toggleRetard(eleve: any = null) {
    if (eleve && eleve.absent) return false;

    if (!this._toggleRetard) {
      this.currentEleve = eleve;
      this.retardMinutes = eleve.retard ? eleve.retard : 10;
    } else {
      this.currentEleve = null;
    }
    this._toggleRetard = !this._toggleRetard;
  }
  // @ts-ignore
  toggleDiscipline(eleve: any = null) {
    if (eleve && eleve.absent) return false;

    if (!this._toggleDiscipline) {
      this.currentEleve = eleve;
      if (this.currentEleve.action.type) {
        this.typeDiscipline = this.currentEleve.action.type;
        this.typeDisciplineId = this.currentEleve.action.type.id;
        this.commentaireDiscipline = this.currentEleve.action.commentaire;
      } else {
        this.typeDiscipline = null;
        this.typeDisciplineId = null;
        this.commentaireDiscipline = null;
      }
    } else {
      this.currentEleve = null;
    }
    this._toggleDiscipline = !this._toggleDiscipline;
    console.log(this.typeDiscipline);
  }
  disciplineChange(type:any) {
    let DisciplineType = this._result.data.types.find(
      (x:any) => x.id === type.target.value
    );
    if (DisciplineType !== undefined) {
      // You can access Id or Name of the found server object.
      console.log(DisciplineType);
      this.typeDiscipline = DisciplineType;
    }
  }
  getData(): void {
    this.apiservice
      .get(
        {
          cours_id: this.cours.id,
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
        },
        "prof_cours_details"
      )
      .subscribe(
        (result) => {
          this._result = result;
          this.loading.dismiss();
          console.log(this._result);
        },
        (error) => console.log("Erreur :: " + error)
      );
  }

  ngOnInit(): void {
    this.storage.get("cours").then((value) => {
      this.cours = value;
      console.log(this.cours);
      this.presentLoadingCustom().then(()=>{
        this.getData();
      })
    });
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

  submit(eleve: any) {
    this.apiservice
      .post({
        enseignant_id: this.authservice.enseignant ,
        key: this.authservice.token,
        eleve : JSON.stringify(eleve)
      },
        "prof_cours_details"
      )
      .subscribe(
        (result) => {},
        (error) => {
          this.loading.dismiss();
        }
      );
  }

  checkAbsence(eleve: any) {
    eleve.absent = !eleve.absent;
    if (eleve.absent && this._result.data.auccune_absences) {
      this._result.data.auccune_absences = !this._result.data.auccune_absences;
    }
    this.submit(eleve);
    console.log();
  }

  checkRetard() {
    this._toggleRetard = false;
    this.currentEleve.retard = this.retardMinutes;
    this.submit(this.currentEleve);
    this.currentEleve = null;
    this.retardMinutes = null;
  }

  checkDiscipline() {
    this._toggleDiscipline = false;
    this.currentEleve.action.type = this.typeDiscipline;
    this.currentEleve.action.commentaire = this.commentaireDiscipline;

    this.submit(this.currentEleve);
    this.currentEleve = null;

    this.commentaireDiscipline = null;
    this.typeDiscipline = null;
    this.typeDisciplineId = null;
  }

  setNoAbsence() {
    this.apiservice
      .post({
        enseignant_id : this.authservice.enseignant ,
        cours : this.cours.id ,
        no_absences : 1
        },
        "prof_cours_details"
      )
      .subscribe(
        async (result: any) => {
          this._result.data.no_absences = result.no_absences;
          let alert = await this.alertCtrl.create({
            cssClass: "success_alert_boti",
            header: result.msg.label,
            message: "",
            buttons: [
              {
                text: result.msg.action,
                role: "cancel",
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

}
