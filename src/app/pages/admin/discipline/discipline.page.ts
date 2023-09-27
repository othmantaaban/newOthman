import { Component, OnInit } from '@angular/core';
// import { GlobalService } from '../globalService/global.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../admin/services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.page.html',
  styleUrls: ['./discipline.page.scss'],
})
export class DisciplinePage {
  private endPoint = "admin_discipline_ens";

  disciplines : any[] = [];
  _result : any;
  dataIsLoading : boolean = false

  constructor(
    // private global : GlobalService,
    private apiservice : ApiService,
    private authservice : AuthService,
    private notification : NotificationService
  ) { }

  ionViewWillEnter() {
    this.dataIsLoading = true
    this.apiservice.get({
      user_id: this.authservice.admin,
    },this.endPoint)
    .subscribe(elt => {
      this.disciplines = elt.disciplince
      this._result = elt;
      this.dataIsLoading = false
    })
  }

  validateDiscipline(id : number, type : string) {
    this.apiservice.post({ 
      user_id: this.authservice.admin,
      id: id,
      type: type
    },this.endPoint)
    .subscribe(elt => {
      let eltRef = document.getElementById(`${id}`)
      this.notification.validateAnimation(eltRef, () => {
        //@ts-ignore
        eltRef.style.margin = "0"
        // setTimeout(() => {
          //@ts-ignore
          eltRef.remove()
        // }, 500);
        console.log(this.disciplines);
        
        this.notification.presentToast(elt.message, elt.status)
      })
    })
  }

  sliceCommentaire(text : string) : string {
    let result = text;
    if(text.length > 21) {
      result = text.slice(0, 21).trim() + "...."
    }

    return result
  }
}
