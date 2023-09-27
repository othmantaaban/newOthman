import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { toDataURL } from 'qrcode';

@Component({
  selector: 'app-checkout-qr',
  templateUrl: './checkout-qr.page.html',
  styleUrls: ['./checkout-qr.page.scss'],
})
export class CheckoutQrPage implements OnInit {
  qrCode: any;
  // @ts-ignore
  _result : any;
  constructor(
    private authservice: AuthService,
    private parentservice: ParentService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public apiSerivce: ApiService,
  ) {
    
  }

  ngOnInit(): void {

    let self = this;
 
    toDataURL(this.authservice.parent, { errorCorrectionLevel: 'H' }, function (err:any, url:any) {
      self.qrCode = url;
    })
  }

  ionViewDidLoad() {
   
  }

  goBack(){
    this.navCtrl.navigateRoot(['/eleve/checkout-enfant']);
  }

}
