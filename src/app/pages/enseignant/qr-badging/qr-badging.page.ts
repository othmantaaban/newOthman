import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraPluginPermissions,
  PermissionStatus,
} from '@capacitor/camera';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

import QrScannerJs from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-qr-badging',
  templateUrl: './qr-badging.page.html',
  styleUrls: ['./qr-badging.page.scss'],
})
export class QrBadgingPage {
  results: any;
  loading: any;
  cameraModal: boolean = false;
  resultQr: any;
  //@ts-ignore
  qrScanner: any;
  _result: any;
  enseignant: any;
  successScanned: boolean = false;
  errorScanned: boolean = false;

  constructor(
    public navCtrl: NavController,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private df: ChangeDetectorRef
  ) {
    // this.enseignant
    
  }

  ionViewWillEnter() {
    this.load();
  }

  ionViewWillLeave() {
    this.stopScan();
  }

  getData(): void {
    this.apiSerivce.get(
      {
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
        getenseignant: true
      }, 'pointage')
      .subscribe(
        result => {
          this._result = result
          console.log(this._result);
          this.enseignant = result.enseignant;
          this.loading.dismiss();
        },
        error => console.log("Erreur :: " + error)
      )
  }

  load() {
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
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

  scan() {
    let videoElem: any = document.getElementById('qr-video');
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

    // this.cameraModal = true;
    // this.qrScanner.start().then(() => {
    //   this.cameraModal = true;
    // });

    if (!this.platform.is('ios')) {
      Camera.requestPermissions({
        permissions: ['camera'],
      } as CameraPluginPermissions).then((res: PermissionStatus) => {
        if (res.camera == 'granted') {
          this.cameraModal = true;
          this.qrScanner.start().then(() => {
            this.cameraModal = true;
          });
        }
      });

      // this.androidPermissions.requestPermissions([
      //   this.androidPermissions.PERMISSION.CAMERA
      // ]).then((result) => {
      //   this.cameraModal = true;
      //   this.qrScanner.start().then(() => {
      //     this.cameraModal = true;
      //   });
      // });
    } else {
      this.cameraModal = true;
      this.qrScanner.start().then(() => {
        this.cameraModal = true;
      });
    }
  }

  scanned(result: any) {
    this.cameraModal = false;
    this.df.detectChanges();
    this.presentLoadingCustom();
    // const formData = new FormData();
    const formData = {
      key: this.authservice.token,
      user_id: this.authservice.user,
      enseignant_id: this.authservice.enseignant,
      qr_code: result.data,
      scan: ''
    }
    // formData.append('key', ApiService.keyToken);
    // formData.append('user_id', ApiService.userId);
    // formData.append('enseignant_id', ApiService.enseignantId);
    // formData.append('qr_code', result.data);
    // formData.append('scan', '');

    this.apiSerivce.post(formData, 'pointage').subscribe((res: any) => {
      this.loading.dismiss();
      this.resultQr = res;
    });
  }

  stopScan() {
    this.cameraModal = false;

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

  history() {
    this.stopScan();
    this.navCtrl.navigateForward(['/enseignant/qr-badging-history']);
  }
}
