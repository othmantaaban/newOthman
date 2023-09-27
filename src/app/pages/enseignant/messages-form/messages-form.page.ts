import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-messages-form',
  templateUrl: './messages-form.page.html',
  styleUrls: ['./messages-form.page.scss'],
})
export class MessagesFormPage {
  imageURI: any;
  imageFileName: any;
  public translation: any;
  public sujet: any;
  public message: any;
  public messageRef: any;
  // @ts-ignore: Unreachable code error
  public formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public apiSerivce: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      sujet: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.messageRef = this.route.snapshot.queryParamMap.get('messageRef');
    this.sujet = this.route.snapshot.queryParamMap.get('sujet');
  // @ts-ignore
    this.translation = JSON.parse(this.route.snapshot.queryParamMap.get('translation'));
    console.log(this.translation);
    
  }

  send() {
    let query:any ={
      sujet: this.sujet,
      message: this.message,
      enseignant_id: this.authservice.enseignant,
      key: this.authservice.token
    }

    if (this.messageRef) query.ref = this.messageRef;

    this.apiSerivce.post(query, "prof_messages").subscribe(
      async (result) => {
        let res: any = result;
        let alert = await this.alertCtrl.create({
          cssClass: "success_alert_boti",
          header: res.title,
          message: res.message,
          buttons: [
            {
              text: "Fermer",
              role: "cancel",
              handler: () => {
                this.navCtrl.navigateRoot(['/enseignant/planning']);
              },
            },
          ],
        });
        alert.present();
      },
      (error) => {
        //alert(error);
        console.log("Error :: " + error);
        //this.loading.dismiss().catch();
      }
    );
  }
}
