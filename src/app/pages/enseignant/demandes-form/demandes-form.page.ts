import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-demandes-form',
  templateUrl: './demandes-form.page.html',
  styleUrls: ['./demandes-form.page.scss'],
})
export class DemandesFormPage implements OnInit {
  _result: any;
  loading: any;
  // @ts-ignore
  private formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      remarque: ['', Validators.nullValidator],
    });
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token
        },
        'prof-nouvelle-demande'
      )
      .subscribe(
        (result) => {
          this._result = result;
          console.log(this._result);
          
          if (this._result && this._result.data[0])
            for (
              let index = 0;
              index < this._result.data[0].questions.length;
              index++
            ) {
              const element = this._result.data[0].questions[index];
              const control: FormControl = new FormControl(
                'question_' + element.id,
                element.required
                  ? Validators.required
                  : Validators.nullValidator
              );
              this.formGroup.addControl('question_' + element.id, control);
            }
          this.loading.dismiss();
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });

    // .forEach(element => {

    // });
  }

  ionViewDidLoad() {
    // if(!this._result.data[0])
    // this.presentLoadingCustom();
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

  post() {}

  natureDemande(nature:any) {
    this.navCtrl.navigateForward(['/enseiganant/demandes-form'], {
      queryParams : { 
        nature: JSON.parse(nature),
        _result: JSON.parse(this._result), 
      }
    });
  }

  send() {
    let query ={
      enseignant_id: this.authservice.enseignant,
      nature: JSON.stringify(this._result.data[0])
    }
      // 'enseignant_id=' +
      // ApiService.enseignantId +
      // '&nature=' +
      // JSON.stringify(this._result.data[0]);
    this.apiSerivce.post(query, 'prof-nouvelle-demande').subscribe(
      (result) => {
        this.navCtrl.navigateRoot(['/enseignant/planning']).then(()=>{
          this.navCtrl.navigateForward(['/enseignant/demandes'])
        });
      },
      (error) => {
        //alert(error);
        console.log('Error :: ' + error);
        //this.loading.dismiss().catch();
      }
    );
  }
}
