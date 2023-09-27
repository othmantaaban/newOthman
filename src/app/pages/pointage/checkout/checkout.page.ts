import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  _result: any;
  constructor(
    private navCtrl: NavController,
    private apiservice: ApiService,
    private authservice: AuthService,
    private route: ActivatedRoute,
  ) { }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        key: this.authservice.token,
        parent : this.route.snapshot.queryParamMap.get('id')
      }, 'pointage_borne')
      .subscribe(
        result => {
          console.log(result);
          this._result = result;
        },
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit() {
    this.getData();
  }

  retour() {
    this.navCtrl.navigateRoot(['/pointage/scan-code']);
  }

  setParentarrived(parent:any){
    
    this.apiservice.post({
      user_id: this.authservice.user,
      key: this.authservice.token,
      parent: parent.id,
      arrived: 1,
    }, 'pointage_borne').subscribe(
      result => {
        this.navCtrl.navigateRoot(['/pointage/borne'])
      },
      error => {
      }
    );
  
  }
}
