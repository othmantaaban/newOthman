import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-cahier-transmission',
  templateUrl: './cahier-transmission.page.html',
  styleUrls: ['./cahier-transmission.page.scss'],
})
export class CahierTransmissionPage implements OnInit {

  _result : any;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService
  ) { }

  getData(): void {
    this.apiservice.get(
      { 
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'transmission')
        .subscribe(
            result => { 
              this._result = result;
              // console.log(this._result.data.today.length)
            }
              , 
            error => console.log("Error :: " + error)
        )
  }

  ngOnInit(): void {
      this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Examens & NotesPage');
  }

}
