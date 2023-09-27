import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import QrScannerJs from 'qr-scanner';
import { AlertController, NavController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraPluginPermissions, PermissionStatus } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.page.html',
  styleUrls: ['./scan-code.page.scss'],
})
export class ScanCodePage implements OnInit {
  showcamera: boolean = true;
  resultQr: any;
  qrScanner: any;
  checkouts: any;
  translation: any;
  constructor(
    private alert: AlertController,
    private navCtrl : NavController,
    private df: ChangeDetectorRef,
    private authservice: AuthService,
    private apiservice: ApiService,
    // private barCode : BarcodeScanner
    private route : ActivatedRoute
  ) { 
    this.translation  = JSON.parse(this.route.snapshot.queryParamMap.get("translation") as string)
    console.log(this.translation);
    
    this.checkouts  = JSON.parse(this.route.snapshot.queryParamMap.get("checkouts") as string)
  }


  ngOnInit() {
    if(Capacitor.isNativePlatform())
    this.scan();
  }

  async ionViewWillEnter() {
  }

  async presentAlert(message : string) {
    const alert = await this.alert.create({
      header: 'ERROR!!!!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  gotoBorne() {
    this.navCtrl.navigateRoot(['pointage/borne'])
  }

  
  scan() {
    let videoElem: any = document.getElementById('qrscannervid');
    this.qrScanner = new QrScannerJs(
      videoElem,
      (result) => {
        this.qrScanner.stop();
        this.qrScanner.destroy();
        this.qrScanner = null;
        videoElem.pause();
        videoElem.removeAttribute('src');
        videoElem.load();
        this.scanned(result);
      },
      {
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        maxScansPerSecond: 20,
      }
    );


    if (Capacitor.getPlatform() != 'ios') {
      Camera.requestPermissions({
        permissions: ['camera'],
      } as CameraPluginPermissions).then((res: PermissionStatus) => {
        if (res.camera == 'granted') {
          this.showcamera = true;
          this.qrScanner.start().then(() => {
            this.showcamera = true;
          });
        }
      });
    } else {
      this.showcamera = true;
      this.qrScanner.start().then(() => {
        this.showcamera = true;
      });
    }
  }

  
  scanned(result: any) {
    this.showcamera = false;
    this.df.detectChanges();
    // this.presentLoadingCustom();
    // const formData = new FormData();
    console.log(result);
    this.navCtrl.navigateRoot(['/pointage/checkout'],{
      queryParams:{
        id: result.data
      }
    })
  }

  stopScan() {
    this.showcamera = false;

    if (this.qrScanner) {
      this.qrScanner.stop();
      this.qrScanner.destroy();
      this.qrScanner = null;
    }

    let videoElem: any = document.getElementById('qr-video');
    videoElem.pause();
    videoElem.removeAttribute('src');
    videoElem.load();
    this.df.detectChanges();
  }

  
}
