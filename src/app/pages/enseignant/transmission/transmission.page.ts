import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonSlides,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.page.html',
  styleUrls: ['./transmission.page.scss'],
})
export class TransmissionPage implements OnInit {
  // @ts-ignore
  @ViewChild(IonSlides) slides: IonSlides;
  firstSlideActive = true;
  lastSlideActive = false;

  _result: any;
  loading: any;
  classe: any = {};
  date: any = new Date().toISOString().slice(0, 19).split('T')[0];
  dateInput: any = this.date;
  _toggleDate: any = false;
  _toggleTransmission: any = false;
  _toggleEleves: any = false;
  selectedRubrique: any = null;
  selectedEleve: any = null;
  inscriptions_selected: any = [];
  inscriptions_list: any = [];
  searchKey: any = null;

  calendarOptions: any = {
    from: new Date(1970),
    to: new Date(),
  };


 tomorrow: any;

  formTransmission: any = {
    indicateur: null,
    action: null,
  };

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authservice: AuthService,
    public route: ActivatedRoute
  ) {
    this.classe.id = this.route.snapshot.queryParamMap.get('classe');

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    this.tomorrow = now.getFullYear()+"-"+(month)+"-"+(day) ;
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          classe_id: this.classe.id,
          date: this.date,
        },
        'prof_transmission'
      )
      .subscribe(
        (result) => {
          this._result = result;
          console.log(this._result);
          this.loading.dismiss();
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
  }

  ionViewDidEnter() {
    if (this.slides) this.slides.lockSwipes(true);
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

  goBack() {
    this.navCtrl.pop();
  }

  toggleDate() {
    this._toggleDate = !this._toggleDate;
    this.dateInput = this.date;
  }

  toggleTransmission(action: any = null) {
    this.formTransmission.indicateur = null;
    this.formTransmission.action = null;

    if (action) {
      this.formTransmission.action = action.id;

      this.selectedRubrique.indicateurs.map((indicateur: any) => {
        if (indicateur.id == action.indicateur)
          this.formTransmission.indicateur = indicateur;
      });

      this.formTransmission.indicateur.fields.map((field: any) => {
        let actionValues = action.values.filter(
          (item: any) => item.id == field.id
        );
        field.value = actionValues.length > 0 ? actionValues[0].value : null;
      });
    }

    if (this._toggleTransmission) this.inscriptions_list = [];

    this._toggleTransmission = !this._toggleTransmission;
  }

  changeDate() {
    this._toggleDate = false;
    this.date = this.dateInput;
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
  }

  async changeAll(frequence: any, indicateur: any) {
    let alert = await this.alertCtrl.create();
    alert.header = frequence.label;
    // alert.setTitle(frequence.label);

    //   interface AlertInputOptions {
    //     type?: string;
    //     name?: string | number;
    //     placeholder?: string;
    //     value?: string;
    //     label?: string;
    //     checked?: boolean;
    //     disabled?: boolean;
    //     id?: string;
    //     handler?: Function;
    //     min?: string | number;
    //     max?: string | number;
    // }
    console.log(`Indicateur : ${indicateur.type}`);
    switch (indicateur.type) {
      case 'texte':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'select':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'radio',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'radio',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'check':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'checkbox',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'checkbox',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'radio':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'radio',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'radio',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'time':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'number':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'boolean':
        alert.inputs.push({
          type: 'radio',
          label: 'Oui',
          value: 'oui',
          checked: frequence.default == 'oui',
        });
        alert.inputs.push({
          type: 'radio',
          label: 'Non',
          value: 'non',
          checked: frequence.default == 'non',
        });
        // alert.addInput({
        //   type: 'radio',
        //   label: 'Oui',
        //   value: 'oui',
        //   checked: (frequence.default == 'oui')
        // });
        // alert.addInput({
        //   type: 'radio',
        //   label: 'Non',
        //   value: 'non',
        //   checked: (frequence.default == 'non')
        // });
        break;
    }
    alert.buttons = [
      'Cancel',
      {
        text: 'Okay',
        handler: (data) => {
          let value = data;
          frequence.default = data;
          frequence.eleves.map((eleve: any) => {
            eleve.value = value;
          });
        },
      },
    ];
    // alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'Okay',
    //   handler: (data) => {
    //     let value = data;
    //     frequence.default = data;
    //     frequence.eleves.map((eleve)=>{
    //       eleve.value = value;
    //     });
    //   }
    // });

    alert.present();
  }

  async editValue(indicateur: any, frequence: any, eleve: any) {
    let alert = await this.alertCtrl.create();

    alert.header = eleve.nom;
    // alert.setTitle(eleve.nom);

    console.log(`Indicateur : ${indicateur.type}`);
    switch (indicateur.type) {
      case 'texte':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'select':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'radio',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'radio',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'check':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'checkbox',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'checkbox',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'radio':
        indicateur.options.map((element: any) => {
          alert.inputs.push({
            type: 'radio',
            label: element.val,
            value: element.val,
            checked: element.val == frequence.default,
          });
          // alert.addInput({
          //   type: 'radio',
          //   label: element.val,
          //   value: element.val,
          //   checked: (element.val == frequence.default)
          // });
        });
        break;
      case 'time':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'number':
        alert.inputs.push({
          name: 'value',
          placeholder: 'valeur',
        });
        // alert.addInput({
        //   name: 'value',
        //   placeholder: 'valeur'
        // });
        break;
      case 'boolean':
        alert.inputs.push({
          type: 'radio',
          label: 'Oui',
          value: 'oui',
          checked: frequence.default == 'oui',
        });
        alert.inputs.push({
          type: 'radio',
          label: 'Non',
          value: 'non',
          checked: frequence.default == 'non',
        });
        // alert.addInput({
        //   type: 'radio',
        //   label: 'Oui',
        //   value: 'oui',
        //   checked: (frequence.default == 'oui')
        // });
        // alert.addInput({
        //   type: 'radio',
        //   label: 'Non',
        //   value: 'non',
        //   checked: (frequence.default == 'non')
        // });
        break;
    }

    alert.buttons = [
      'Cancel',
      {
        text: 'Okay',
        handler: (data) => {
          let value = data;
          eleve.value = value;
        },
      },
    ];
    // alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'Okay',
    //   handler: (data) => {
    //     let value = data;
    //     eleve.value = value;
    //   }
    // });

    alert.present();
  }

  saveIndicateur(indicateur: any) {
    this.apiSerivce
      .post(
        {
          enseignant_id: this.authservice.enseignant,
          date: this.date,
          indicateur: JSON.stringify(indicateur),
        },
        'prof_transmission'
      )
      .subscribe(
        async (result: any) => {
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti',
            header: result.title,
            message: result.message,
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

  async slideBack() {
    if (!(await this.slides.isBeginning())) {
      await this.slides.lockSwipes(false);
      await this.slides.slidePrev();
      await this.slides.lockSwipes(true);
    }
  }

  async slideNext() {
    if (!(await this.slides.isEnd())) {
      await this.slides.lockSwipes(false);
      await this.slides.slideNext();
      await this.slides.lockSwipes(true);
    }
  }

  async checkSlide() {
    if (await this.slides.isBeginning()) {
      this.firstSlideActive = true;
      this.lastSlideActive = false;
    } else if (await this.slides.isEnd()) {
      this.lastSlideActive = true;
      this.firstSlideActive = false;
    } else {
      this.lastSlideActive = false;
      this.firstSlideActive = false;
    }
  }

  addAction(eleve: any, rubrique: any) {
    this.selectedRubrique = rubrique;
    this.inscriptions_list = rubrique.eleves;

    this.selectedEleve = eleve;

    this.toggleTransmission();
  }

  editAction(eleve: any, rubrique: any, action: any) {
    this.selectedRubrique = rubrique;
    this.inscriptions_list = rubrique.eleves;

    this.selectedEleve = eleve;

    this.toggleTransmission(action);
  }

  addTransmission() {
    console.log(`this.date : `, this.date);
    console.log(`this.selectedRubrique : `, this.selectedRubrique);
    console.log(`this.selectedEleve : `, this.selectedEleve);
    console.log(`this.formTransmission : `, this.formTransmission);

    let query:any = {
      enseignant_id: this.authservice.enseignant,
      date: this.date,
      classe: this.classe.id,
      indicateur: this.formTransmission.indicateur.id,
      action: this.formTransmission.action,
      values: JSON.stringify(this.formTransmission.indicateur.fields),
    };

    if (this.selectedEleve) query.eleve = this.selectedEleve.id;

    if (this.inscriptions_selected.length > 0)
      query.inscriptions = JSON.stringify(this.inscriptions_selected);

    this.apiSerivce.post(query, 'prof_transmission').subscribe(
      (result: any) => {
        this.toggleTransmission();

        this.inscriptions_selected = [];

        this.getData();
      },
      (error) => {
        this.loading.dismiss();
      }
    );
  }

  toggleElevesModal() {
    this._toggleEleves = !this._toggleEleves ? true : false;
  }

  search_key(ev:any) {
    this.searchKey = ev.value;
    this.search();
  }

  search() {
    this.inscriptions_list = this.selectedRubrique.eleves.filter((item:any) =>
      Object.keys(item).some(
        (k) =>
          k == 'nom' &&
          item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
      )
    );
  }

  selectInscription(inscription:any) {
    let index = this.inscriptions_selected
      ? this.inscriptions_selected.indexOf(inscription.id)
      : -1;
    if (index >= 0) {
      this.inscriptions_selected.splice(index, 1);
    } else {
      this.inscriptions_selected.push(inscription.id);
    }
  }
}
