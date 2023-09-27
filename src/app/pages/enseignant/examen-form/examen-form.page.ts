import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.page.html',
  styleUrls: ['./examen-form.page.scss'],
})
export class ExamenFormPage implements OnInit {
  loading: any;
  result: any;
  examen: any = {
    id: null,
    type: null,
    classe: null,
    unite: null,
    matiere: null,
    date: null,
  };
  // @ts-ignore: Unreachable code error
  private formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public route: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    if (this.route.snapshot.queryParamMap.get('examen')) {
      this.examen = this.route.snapshot.queryParamMap.get('examen');
    }

    this.formGroup = this.formBuilder.group({
      type: ['', Validators.nullValidator],
      classe: ['', Validators.nullValidator],
      unite: ['', Validators.nullValidator],
      matiere: ['', Validators.nullValidator],
      date: ['', Validators.nullValidator],
      id: ['', Validators.nullValidator],
    });
  }

  ionViewDidLoad() {
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      duration: 3000000,
    });
    this.loading.present();
  }

  getData(): void {
    let params = {
      enseignant_id: this.authservice.enseignant,
      id: this.examen.id,
    };

    this.apiSerivce.get(params, 'prof_examen_form').subscribe(
      (result: any) => {
        this.result = result;
        if (result.data.unites.length == 1) {
          this.examen.unite = result.data.unites[0];
        }
        console.log(result);
        
        this.loading.dismiss();
      },
      (error) => {
        this.loading.dismiss();
        console.log('Error :: ' + error);
      }
    );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
    });

    toast.present();
  }

  submit() {
    this.presentLoadingCustom();

    this.apiSerivce
      .post(
        {
          enseignant_id: this.authservice.enseignant,
          examen: JSON.stringify(this.examen),
        },
        'prof_examen_form'
      )
      .subscribe(
        async (result) => {
          this.loading.dismiss();
          let res: any = result;

          let alert = await this.alertCtrl.create({
            cssClass: res.class,
            header: res.title,
            message: res.message,
            buttons: [
              {
                text: 'Fermer',
                role: 'cancel',
                handler: () => {
                  if(res.class == 'success_alert_boti')
                  this.navCtrl
                    .navigateRoot(['/enseignant'])
                    .then(() => {
                      this.navCtrl.navigateRoot(['/enseignant/examens']);
                    });
                },
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

  async presentToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    });

    toast.present();
  }
}
