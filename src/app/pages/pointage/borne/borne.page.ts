import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-borne',
  templateUrl: './borne.page.html',
  styleUrls: ['./borne.page.scss'],
})
export class BornePage implements OnInit {
  // @ts-ignore
  date : string;
  _result: any;

  constructor(
    private navCtrl : NavController,
    private apiservice : ApiService,
    private authservice : AuthService,
  ) { }


  getData(event: any = null): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        key: this.authservice.token,
      }, 'pointage_borne')
      .subscribe(
        result => {
          console.log(result);
          this._result = result;
          if(event){
            event.target.complete();
            console.log('refereshed')
          }
        },
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit() {
    this.getData();
    this.formatDate()
  }

  logout(){
    this.authservice.logout();
  }

  navigateTo() {
    this.navCtrl.navigateRoot(['pointage/scan-code'], {
      queryParams : {
        translation : (this._result?JSON.stringify(this._result.translation):'{}'),
        checkouts : (this._result?JSON.stringify(this._result.checkouts):'[]')
      }
    })
    // queryParams : {
    //   trajet: trajetID,
    //   ordre: action
    // }
  }

  setPicked(idParent: any){
    this.apiservice.post({
      user_id: this.authservice.user,
      key: this.authservice.token,
      parent: idParent
    }, 'pointage_borne').subscribe(
      result => {
       this.getData();
      },
      error => {
      }
    );
  }


  formatDate() {
    let date = new Date();
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() % 100;
    
    this.date = `${dayOfWeek} ${day} ${month} ${year}`;
  }
  
}
