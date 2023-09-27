import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonSlides, LoadingController, NavController, ToastController } from '@ionic/angular';
import { CompetenceTreeComponent } from 'src/app/components/competence-tree/competence-tree';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-competences-form',
  templateUrl: './competences-form.page.html',
  styleUrls: ['./competences-form.page.scss'],
})
export class CompetencesFormPage implements OnInit {

  @ViewChild(CompetenceTreeComponent) compTree: any;
  // @ts-ignore: Unreachable code error
  @ViewChild('mySlider') mySlider: IonSlides;

  loading: any;
  result: any;
  examen: any = {
    id: null,
    titre: null,
    classes: [],
    description: null,
    coef: 1,
    date: null,
    eleves: [],
    groupes: [],
  };
  classe: any;

  showElevesModal: boolean = false;
  inscriptions: any[] = [];
  all_inscriptions: any[] = [];
  searchKey: any;

  // @ts-ignore: Unreachable code error
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public route: ActivatedRoute,
    public apiSerivce: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {

    if (this.route.snapshot.queryParamMap.get('examen')) {
      this.examen = this.route.snapshot.queryParamMap.get('examen');
    }

    this.formGroup = this.formBuilder.group({
      classes: ['', Validators.nullValidator],
      titre: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator],
      coef: ['', Validators.nullValidator],
      date: ['', Validators.nullValidator],
      id: ['', Validators.nullValidator]
    });

  }

  ionViewDidLoad() {
    // this.presentLoadingCustom();
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      duration: 3000000
    });
    this.loading.present();
  }

  getData(): void {

    let params = {
      enseignant_id: this.authservice.enseignant,
      id: this.examen.id,
    };

    this.apiSerivce.get(params, 'prof_competence_form')
      .subscribe(
        (res: any) => {
          this.result = res;
          this.classe = res.data.classes[0].id;
          this.mySlider.lockSwipes(true)
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          console.log("Error :: " + error);
        }
      )
  }

  ngOnInit(): void {
    this.presentLoadingCustom()
    this.getData();
  }
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  async submit() {
    console.log(this.mySlider.isEnd())
    let isEnd = await this.mySlider.isEnd();
    if (this.formGroup.valid && isEnd) {
      console.log('send')
      this.presentLoadingCustom();

      this.apiSerivce.post({
        enseignant_id: this.authservice,
        examen: JSON.stringify(this.examen)
      }, 'prof_competence_form').subscribe(
        async result => {
          this.loading.dismiss();
          let res: any = result;

          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti',
            header: res.title,
            message: res.message,
            buttons: [{
              text: 'Fermer',
              role: 'cancel',
              handler: () => {
                this.navCtrl.navigateRoot(['/enseignant']);
              }
            }]
          });
          alert.present();

        },
        error => {
          this.loading.dismiss();
        }
      );
    } else if (!isEnd) {
      console.log(this.examen);
      switch (await this.mySlider.getActiveIndex()) {
        case 0:
          let err = null;
          if (!this.examen.titre) {
            err = 'Le titre d\'evaluation est obligatoire !';
          }

          if (this.examen.classes.length == 0) {
            err = 'Vous devez choisir au moins une classe !';
          }

          if (!this.examen.date) {
            err = 'La date d\'evaluation est obligatoire !';
          }

          if (err) {
            let alert = await this.alertCtrl.create({
              cssClass: 'success_alert_boti',
              header: err,
              message: '',
              buttons: [{
                text: 'Fermer',
                role: 'cancel',
                handler: () => {

                }
              }]
            });
            alert.present();

          } else {
            await this.mySlider.lockSwipes(false)
            await this.mySlider.slideNext();
            await this.mySlider.lockSwipes(true)
          }

          break;

        default:
          break;
      }
    }
  }

  async presentToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }


  toggleElevesModal(save = false) {

    if (!this.showElevesModal && this.examen.classes) {

      let params = {
        op: 'getInscription',
        enseignant_id: this.authservice.enseignant,
        "classes[]": this.examen.classes
      };

      this.apiSerivce.get(params, 'prof_content').subscribe(
        (result: any) => {
          this.all_inscriptions = result.inscriptions;
          this.inscriptions = this.all_inscriptions;
          this.searchKey = null;
          console.log(this.inscriptions)
        }
      );

    }

    this.showElevesModal = !(this.showElevesModal) ? true : false;
  }


  search_key(ev: any) {
    this.searchKey = ev.value;
    this.search();
  }

  search() {
    this.inscriptions = this.all_inscriptions.filter(item =>
      Object.keys(item).some(
        k =>
          (k == 'nom') && item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
      )
    );
  }

  selectInscription(inscription: any) {
    let index = -1;
    this.examen.eleves.map((inscri: any, idx: any) => {
      if (inscri.id == inscription.id)
        index = idx;
    });

    if (index >= 0) {
      this.examen.eleves.splice(index, 1);
    } else {
      this.examen.eleves.push(inscription);
    }
  }

  isSelected(inscription: any) {
    let index = false;
    this.examen.eleves.map((inscri: any, idx: any) => {
      if (inscri.id == inscription.id)
        index = true;
    });
    return index;
  }

  getTreeValue($elem: any) {
    // console.log($elem);
    // console.log($elem.getValue());
    this.examen.groupes = $elem.getValue();
  }

}
