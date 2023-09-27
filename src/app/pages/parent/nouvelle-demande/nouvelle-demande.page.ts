import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-nouvelle-demande',
  templateUrl: './nouvelle-demande.page.html',
  styleUrls: ['./nouvelle-demande.page.scss'],
})
export class NouvelleDemandePage implements OnInit {

  _result: any;
  nature:any;
  loading: any;
  // @ts-ignore: Unreachable code error
  formGroup : FormGroup;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private navController: NavController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    if(this.route.snapshot.paramMap.get('nature')){
  // @ts-ignore: Unreachable code error
      this.nature = JSON.parse(this.route.snapshot.paramMap.get('nature'));
      console.log(this.nature)
    }

      if(this.route.snapshot.paramMap.get('_result'))
        this._result = this.route.snapshot.paramMap.get('_result');
    
    if(this.nature) {

      this.formGroup = this.formBuilder.group({
        remarque : ['', Validators.nullValidator],
      });

      this.nature.questions.forEach((element: any) => {
          const control: FormControl = new FormControl('question_'+element.id , element.required?Validators.required:Validators.nullValidator);
          this.formGroup.addControl('question_'+element.id, control);
      });
    }
  }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'nouvelle-demande')
      .subscribe(
        result => {
          this._result = result;
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }



  ngOnInit(): void {
    if (!this.nature)
      this.getData();
  }

  ionViewDidLoad() {
    if (!this.nature)
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

  post() {

  }

  natureDemande(nature: any) {
    
    // this.router.navigate(['/parent/nouvelle-demande'],{
    //   queryParams:{
    //     nature: JSON.stringify(nature),
    //     _result: JSON.stringify(this._result)
    //   },
    //   replaceUrl: true,
    //   onSameUrlNavigation: 'reload'
    // })
    this.nature = nature;
    if(this.nature) {

      this.formGroup = this.formBuilder.group({
        remarque : ['', Validators.nullValidator],
      });

      this.nature.questions.forEach((element: any) => {
          const control: FormControl = new FormControl('question_'+element.id , element.required?Validators.required:Validators.nullValidator);
          this.formGroup.addControl('question_'+element.id, control);
      });
    }
    // this.navCtrl.push(NouvelleDemandePage, {
    //   nature: nature,
    //   _result: this._result
    // });
  }

  send() {
  //   let query = "nature=" + JSON.stringify(this.nature) +
  //     "&eleve_id=" + this.parentservice.currentEleve.id +
  //     "&parent_id=" + this.parentservice.parentId +
  //     "&user_id=" + this.authservice.user +
  //     "&key=" + this.authservice.token
  //     ;

    this.apiservice.post({
      nature : JSON.stringify(this.nature) ,
      eleve_id : this.parentservice.currentEleve.id ,
      parent_id : this.parentservice.parentId ,
      user_id : this.authservice.user ,
      key : this.authservice.token
    }, 'nouvelle-demande').subscribe(
      result => {

        this.navController.navigateRoot(['/parent/']).then(()=>{
          this.navController.navigateForward(['/parent/demandes'])
        })
      },
      error => {

        //alert(error);
        console.log("Error :: " + error);
        //this.loading.dismiss().catch();
      }
    );
  }



}
