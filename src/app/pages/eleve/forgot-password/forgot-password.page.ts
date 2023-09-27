import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  loading: any;
  loadingBlur: any;
  formGroup: FormGroup;
  actuel: any;
  nouveau: any;
  confirmer: any;
  _result: any;

  constructor(
    public authservice: AuthService,
    public parentservice: ParentService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {

    this.formGroup = this.formBuilder.group({
      actuel: ['', Validators.required],
      nouveau: ['', Validators.required],
      confirmer: ['', Validators.required],
    });

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

  getData(): void {
    this.apiSerivce.get({
      user_id: this.authservice.user,
      parent_id: this.parentservice.parentId,
      key: this.authservice.token,
    }, 'change-password')
      .subscribe(
        result => {
          this._result = result;

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
    this.getData();
  }

  closeModal() {
    this.navCtrl.back();
  }

  valider() {

    // let query = "actuel=" + this.actuel +
    //   "&nouveau=" + this.nouveau +
    //   "&confirmer=" + this.confirmer +
    //   "&user_id=" + ApiService.userId + "&parent_id=" + ApiService.parentId +
    //   "&key=" + ApiService.keyToken
    //   ;

    this.apiSerivce.post({
      actuel: this.actuel,
      nouveau: this.nouveau,
      confirmer: this.confirmer,
      user_id: this.authservice.user,
      parent_id: this.parentservice.parentId,
      key: this.authservice.token,
    }, 'change-password').subscribe(
      result => {

        this._result = result;

        if (this._result.error === false) {

          this.sendNotification(this._result.msg, 'toast-success');
          this.navCtrl.back();
          // this.viewCtrl.dismiss();

        }
        else {
          this.sendNotification(this._result.msg, 'toast-error');
          this.actuel = null;
          this.nouveau = null;
          this.confirmer = null;
        }

      },
      error => {

      }
    );
  }

  async sendNotification(message: any, classe: any) {
    let notification = await this.toastCtrl.create({
      message: message,
      duration: 100000,
      cssClass: classe,
      position: 'middle',
      buttons:[
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    notification.present();
  }



}
