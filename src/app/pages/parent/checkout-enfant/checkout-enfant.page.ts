import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-checkout-enfant',
  templateUrl: './checkout-enfant.page.html',
  styleUrls: ['./checkout-enfant.page.scss'],
})
export class CheckoutEnfantPage implements OnInit {

  imageArr: any;

  showElevesModal: boolean = false;
  _result: any;
  loading: any;

  arrive: any;
  en_route: any;
  recupere: any;

  _toggleRetard: boolean = false;
  _toggleRecuperant: boolean = false;
  _toggleFormRecuperant: boolean = false;
  _toggleSms: boolean = false;
  addedNewRecuperant: boolean = false;
  retardCounter = 10;
  timerRetard: any;

  sentRetard = false;
  sentRecuperant = false;

  searchKey: any;
  all_inscriptions: any = [];
  inscriptions: any = [];
  inscriptions_selected: any = [];
  currentImage: any;

  pickup_personne: any;

  // @ts-ignore: Unreachable code error
  formGroup: FormGroup;

  constructor(
    private authservice: AuthService,
    private parentservice: ParentService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    // public app: App,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      tel: ['', Validators.required],
      cin: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
  }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        key  : this.authservice.token,
      }, 'pick_enfants')
      .subscribe(
        result => {
          this._result = result;
          this.en_route = this._result.en_route;
          this.arrive = this._result.arrive;

          this.retardCounter = this._result.retard || 10;
          this.sentRetard = !!this._result.retard;
          if (this.sentRetard) {

            let time = (60 * this.retardCounter);
            this.startTimer(time);
            setTimeout(() => {
              this.sentRetard = false;
            }, time * 10000);

          }

          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();
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

  async clickAction(action: any) {

    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Veuillez patienter..',
      cssClass: 'custom-class checkout-loading',
    });

    await loading.present();




    if (action) {
      // let query = "user_id=" + ApiService.userId + "&parent_id=" + ApiService.parentId +
      //   "&eleve_id=" + ApiService.eleveId +
      //   "&key=" + ApiService.keyToken +
      //   "&action=" + action;
      let query = {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        key  : this.authservice.token,
        eleve_id: this.parentservice.currentEleve.id ,
        action: action
      };

      this.apiSerivce.post(query, 'pick_enfants').subscribe(
       async result => {
          let res: any = result;
          this.en_route = res.en_route;
          this.arrive = res.arrive;
          this.recupere = res.recupere;
          if (!res.recupere) {
            let alert = await this.alertCtrl.create({
              cssClass: 'success_alert_boti success_alert_checkout ' + res.modal_class,
              header: res.modal_title,
              buttons: [
                {
                  text: 'Fermer',
                  handler: () => {
                  }
                }]
            });
            alert.present();
          } else {

            let thisBind = this
            setTimeout(() => {

              thisBind.closePage();

            }, 3000);
          }
          loading.dismiss();
        },
        error => {
          loading.dismiss();
        }
      );
    }
  }

  async setRetard(callback:any) {

    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Veuillez patienter..',
      cssClass: 'custom-class checkout-loading',
    });

    await loading.present();

    // let query = "user_id=" + ApiService.userId + "&parent_id=" + ApiService.parentId +
    //   "&key=" + ApiService.keyToken +
    //   "&action=retard" +
    //   "&retard=" + this.retardCounter;

      let query = {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        key  : this.authservice.token,
        eleve_id: this.parentservice.currentEleve.id ,
        action: 'retard',
        retard: this.retardCounter
      };

    this.apiSerivce.post(query, 'pick_enfants').subscribe(
      result => {
        let res: any = result;
        callback(res);
        loading.dismiss();

      },
      error => {
        loading.dismiss();
      }
    );

  }

  closePage() {
    // this.app.getRootNav().setRoot(NouveautesPage);
    this.navCtrl.navigateRoot(['/parent'])
  }

  closeRetard() {
    this._toggleRetard = !this._toggleRetard;
  }

  toggleRetard() {
    this._toggleRetard = !this._toggleRetard;
  }

  incrementRetard() {
    this.retardCounter = this.retardCounter + 10;
  }
  decrementRetard() {
    if (this.retardCounter > 10)
      this.retardCounter = this.retardCounter - 10;
  }
  addRetard() {
    this.setRetard((res: any) => {
      this.en_route = res.en_route;
      this.arrive = res.arrive;
      this.recupere = res.recupere;
      this.retardCounter = res.retard;
      this.sentRetard = res.retard != null;

      setTimeout(() => {
        this._toggleRetard = !this._toggleRetard;
      }, 1000);

      let time = (60 * this.retardCounter);
      this.startTimer(time);

    });

  }

  saveRecuperant() {

    // let personne = document.getElementsByClassName('checked')[0].getElementsByTagName('input')[0].value;

    // let formData = new FormData();

    // formData.append('parent_id', ApiService.parentId);
    // formData.append('key', ApiService.keyToken);
    // formData.append('notify_pick_personne', "1");
    // formData.append('personne_id', personne);

    this.apiSerivce.post({
      parent_id: this.parentservice.parentId,
      eleve_id: this.parentservice.currentEleve.id,
      key: this.authservice.token,
      notify_pick_personne: 1,
      personne_id: this.pickup_personne
    }, 'pick_enfants').subscribe(
      result => {
        // let res: any = result;
        this.sentRecuperant = true;
        // document.getElementById('recuperant-success-title').innerText = res.title;
        // document.getElementById('recuperant-success-msg').innerText = res.msg;
      }
    );

    // console.log(personne);
    // this._toggleRetard = !this._toggleRetard;
  }

  toggleRecuperant() {
    this._toggleRecuperant = !this._toggleRecuperant;
  }

  toggleCheckgroup(personne: any) {
    // if (e.target.classList.contains('checked')) {
    //   e.target.classList.remove("checked");
    //   e.target.nextSibling.setAttribute('checked',null);
    // } else if (!e.target.parentElement.classList.contains('disabled')) {
    //   e.target.parentElement.classList.add("checked");
    //   e.target.nextSibling.setAttribute('checked','checked');
    // }
    this.pickup_personne = personne.id;
  }

  closeRecuperant() {
    this._toggleRecuperant = !this._toggleRecuperant;
  }

  closeFormRecuperant() {
    this._toggleRecuperant = !this._toggleRecuperant;
    this._toggleFormRecuperant = !this._toggleFormRecuperant;
  }

  addRecuperant() {
    this._toggleRecuperant = !this._toggleRecuperant;
    this._toggleFormRecuperant = !this._toggleFormRecuperant;
  }

  async saveFormRecuperant() {

    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Veuillez patienter..',
      cssClass: 'custom-class checkout-loading',
    });

    await loading.present();
    let data = this.formGroup.value;
    // let formData = new FormData();
    data.parent_id = this.parentservice.parentId;
    data.eleve_id = this.parentservice.currentEleve.id;
    data.key = this.authservice.token;
    data.add_personne = true;

    // for (let d in data) {
    //   formData.append(d, data[d]);
    // };
    this.apiSerivce.post(data, 'pick_enfants').subscribe(
      result => {
        let res: any = result;
        this._result.new_personne = res.new_personne;
        this._toggleFormRecuperant = !this._toggleFormRecuperant;
        this._toggleSms = !this._toggleSms

        loading.dismiss();
      },
      error => {
        loading.dismiss();
      }
    );


  }

  closeSms() {
    this._toggleSms = !this._toggleSms;
    this._toggleRecuperant = !this._toggleRecuperant;
  }

  async confirmSms() {
    console.log(this._result.new_personne);

    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Veuillez patienter..',
      cssClass: 'custom-class checkout-loading',
    });

    // let formData = new FormData();

    // formData.append('parent_id', ApiService.parentId);
    // formData.append('key', ApiService.keyToken);
    // formData.append('verification_personne', "1");
    // formData.append('id', this._result.new_personne.id,);
    // formData.append('code_verification', this._result.new_personne.code_verification);

    this.apiSerivce.post({
      parent_id: this.parentservice.parentId,
      key: this.authservice.token,
      verification_personne: 1,
      id:  this._result.new_personne.id,
      code_verification: this._result.new_personne.code_verification
    }, 'pick_enfants').subscribe(
      async result => {
        let res: any = result;
        if (res.verified) {
          this.addedNewRecuperant = true;
          this._result.personne_autorizeds.push(res.personne);
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti success_alert_checkout ' + res.modal_class,
            header: res.msg,
            buttons: [
              {
                text: 'Fermer',
                handler: () => {
                  this._toggleSms = !this._toggleSms;
                  this._toggleRecuperant = !this._toggleRecuperant;
                }
              }]
          });
          alert.present();

        } else {
          let alert = await this.alertCtrl.create({
            cssClass: 'success_alert_boti success_alert_checkout ' + res.modal_class,
            header: res.msg,
            buttons: [
              {
                text: 'Fermer',
                handler: () => {

                }
              }]
          });
          alert.present();

        }
        loading.dismiss();


      },
      error => {
        loading.dismiss();
      }
    );


  }


  startTimer(duration: any) {
    var timer = duration, minutes, seconds;
    let refreshIntervalId = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.timerRetard = minutes + ":" + seconds;

      if (this.timerRetard == "00:00") {
        clearInterval(refreshIntervalId);
        this.sentRetard = false;
      }

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  openQr(){
    this.navCtrl.navigateRoot(['/parent/checkout-qr']);
  }


}
