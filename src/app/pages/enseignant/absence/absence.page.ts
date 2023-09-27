import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {

  _result: any;
  classe: any = {};
  loading: any;
  date = (new Date()).toISOString().slice(0, 19).split('T')[0];
  dateInput = this.date;
  _toggleDate = false;
  calendarOptions = {
    from: new Date(1970),
    to: new Date()
  };
  retardEleve: any = {};
  retardPeriode: any = {};
  _toggleRetard = false;
  retardMinutes = null;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authservice: AuthService,
    public route: ActivatedRoute
  ) {
    this.classe.id = this.route.snapshot.queryParamMap.get('classe');
   }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id : this.authservice.enseignant,
        key  : this.authservice.token,
        classe_id  : this.classe.id,
        date : this.date
      }, 'prof_absences')
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
    this.presentLoadingCustom().then(()=>{
      this.getData();
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

  toggleDate(){
    this._toggleDate = !this._toggleDate
    this.dateInput =  this.date;
  }

  changeDate(){
    this._toggleDate = false;
    this.date = this.dateInput;
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }

  hasPeriode(eleve:any,periode:any){
    const prd = eleve.periodes.filter((item:any)=> (item.id == periode.id));
    
    return (prd.length > 0)?true:false;
  }
  getPeriode(eleve:any,periode:any){
    const prd = eleve.periodes.filter((item:any)=> (item.id == periode.id));
    
    return (prd.length > 0)?prd[0]:null;
  }


  submit(eleve:any,periode:any,absent:any,retard:any=null) {
    this.apiSerivce.post({
        enseignant_id:this.authservice.enseignant,
        date:this.date,
        periode:periode.id,
        eleve: eleve.id,
        absent: absent,
        retard: (retard?retard:null)
    }, 'prof_absences').subscribe(
      (result) => {
        if(retard){
          this.toggleRetard(eleve,periode);
        }
      }, 
      error =>  {
        this.loading.dismiss();
      }
  );
  }

  checkAbsence(eleve:any,periode:any) {
    let check = false;
    eleve.periodes.map((item:any)=>{
      if(periode.id == item.id){
        item.absent = !item.absent;
        if(item.absent){
          item.retard = null
        }
        check = item.absent;
      }
    })
    this.submit(eleve,periode,check);
  }

// @ts-ignore
  toggleRetard(eleve:any,periode:any = null){
    // let thisPeriod = null;
    for (let index = 0; index < eleve.periodes.length; index++) {
      const item = eleve.periodes[index];
      if(periode && periode.id == item.id && item.absent){
        // thisPeriod = item;
        return false;
      }
    }
    // if(!thisPeriod.absent){

      if(!this._toggleRetard) {
        this.retardEleve = eleve;
        for (let index = 0; index < eleve.periodes.length; index++) {
          const item = eleve.periodes[index];
          if(periode.id == item.id){
            this.retardMinutes = item.retard?item.retard:10;
          }
        }
        this.retardPeriode = periode;
      } else {
        this.retardEleve = null;
        this.retardPeriode = null;
      }
      this._toggleRetard = !this._toggleRetard;
    // }
  }

  checkRetard() {
    this.retardEleve.periodes.map((item:any)=>{
      if(this.retardPeriode.id == item.id){
        item.retard = this.retardMinutes;
      }
    })
    this.submit(this.retardEleve,this.retardPeriode,true,this.retardMinutes);
  }

  
  goBack() {
    this.navCtrl.pop();
  }
}
