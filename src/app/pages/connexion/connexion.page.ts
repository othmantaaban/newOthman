import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  // @ts-ignore: Unreachable code error
  @ViewChild('passwordInput') passwordInputElement: ElementRef;
  _result: any;
  _resultPage: any;
  loading: any;
  loadingBlur: any;
  public loginI: any;
  public passwordI: any;
  public privacyI: boolean = false;
  // @ts-ignore: Unreachable code error
  public formGroup: FormGroup;
  showPwd: boolean = false;
  pwdType: string = "password";
  pwdIcon: string = "eye";

  public simInfo: any;
  public cards: any;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public apiSerivce: ApiService,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private authservice: AuthService
  ) {

    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      privacy: ['', Validators.requiredTrue],
    });

  }
  getData(): void {
    this.apiSerivce.get({}, 'login-page')
      .subscribe(
        result => {
          this._resultPage = result;
          console.log(result);
          
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
    // this.events.publish('network:type');
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ConnexionPage');
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


  async sendNotification(message: string, classe: string): Promise<void> {
    let notification = await this.toastCtrl.create({
      message: message,
      duration: 100000,
      cssClass: classe,
      position: 'middle',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    notification.present();
  }



  showHidePassword() {
    this.showPwd = !this.showPwd;

    if (this.showPwd) {
      this.pwdType = 'text';
      this.pwdIcon = 'eye-off';
    } else {
      this.pwdType = 'password';
      this.pwdIcon = 'eye';
    }
  }

  login() {
    if (this.formGroup.valid) {
      this.authservice.login({
        login: this.loginI,
        password: this.passwordI,
      }).then((res: string)=>{
        this.authservice.goToHome(res);
      }).catch(err=>{
        this.sendNotification(err, 'toast-error');
      });
      // this.apiSerivce.post({
      //   login: this.loginI,
      //   password: this.passwordI,
      // }, 'login').subscribe(
      //   result => {

      //     // this._result = result;

      //     // if(this._result.error === false)
      //     // {

      //     // this.events.publish('storage:infos', this._result);
      //     // this.events.publish('compte:check');
      //     // this.events.publish('user:fcm');

      //     // if(this._result._acces == 'parent') {
      //     //   this.navCtrl.setRoot(NouveautesPage);
      //     // } else if(this._result._acces == 'enseignant') {
      //     //   this.navCtrl.setRoot(ProfPlanningPage);
      //     // }


      //     // }
      //     // else
      //     // {
      //     //    this.sendNotification(this._result.msg, 'toast-error');
      //     // }

      //   },
      //   error => {

      //     //alert(error);
      //     console.log("Error :: " + error);
      //     //this.loading.dismiss().catch();
      //   }
      // );

    }
  }

  forgotPasswordModal() {
    // let passwordModal = this.modalCtrl.create(ForgotPasswordPage);
    // passwordModal.present();
  }

  connexionPhonenumberModal() {
    // let passwordModal = this.modalCtrl.create(ConnexionPhoneNumberPage);
    // passwordModal.present();
  }


  goToConfidentialite() {
    // this.navCtrl.push(ConfidentialitePage);
  }


}
