import { Component } from '@angular/core';
import { NotificationService } from '../admin/services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { GlobalService } from '../globalService/global.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage {
  private endPoint = "admin_absence_ens"
  _result : any
  absences : Array<any> = [];
  dataIsLoad : Boolean = false
  constructor
  (
    private notifaction : NotificationService,
    private authsevice : AuthService,
    private apiservice : ApiService
    // private global : GlobalService
  )
  {}


  initialize() {
    this.dataIsLoad = true
    this.apiservice.get({},this.endPoint)
    .subscribe(elt => {
      this.absences = elt.absence
      console.log(elt);
      
      this._result = elt
      this.dataIsLoad = false
    })
  }


  ionViewWillEnter() {
    this.initialize()
  }

  validateAbsence(id : number, type : string) {
    this.apiservice.post({
      user_id: this.authsevice.admin, 
      id: id, 
      type: type
    },this.endPoint)
    .subscribe((elt) => {
      let eltRef = document.getElementById(`${id}`)
      this.notifaction.validateAnimation(eltRef, () => {
        // @ts-ignore
        eltRef.remove()
        this.notifaction.presentToast(elt.message, elt.status)
      });
    })
  }

}

// $result["absence"][] = $absence_;
// }
// $result["translation"] = [
//     "absenceAValider" => "Absences & retards à valider :",
//     "retard" => "Retard",
//     "seances" => "séances",
//     "no_data" => "Aucune donnée disponible"
// ];
