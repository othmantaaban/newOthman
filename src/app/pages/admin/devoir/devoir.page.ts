import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { AnimationController, IonAccordionGroup, IonButton, ToastController } from '@ionic/angular';
// import { FileService } from '../globalService/file.service';
import { NotificationService } from '../admin/services/notification.service';
import { FileService } from 'src/app/services/file.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.page.html',
  styleUrls: ['./devoir.page.scss'],
})
export class DevoirPage implements OnInit {
  //@ts-ignore
  @ViewChild('accordionGroup') group: IonAccordionGroup;


  _result : any;
  accordionVal: any = null;
  messageSuccess: string = '';
  all_devoirs: Array<any> = [];
  validated_devoirs: Array<any> = [];
  non_validated_devoirs: Array<any> = [];
  devoirContent: Object = {};
  contentIsLoad: boolean = false;
  dataIsLoad: boolean = false;
  devoirs: Array<any> = []
  selectedElement: any = undefined


  constructor(
    private notificationService: NotificationService,
    private file: FileService,
    private cdr: ChangeDetectorRef,
    private apiservice: ApiService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.dataIsLoad = true;
  }

  private sendNotification(countNot: number) {

    this.notificationService.getNotification(JSON.stringify({ devoir: countNot }))
  }

  ionViewWillEnter() {
    this.dataIsLoad = true;
    this.initialize();
  }

  initialize() {
    this.non_validated_devoirs = [];
    this.validated_devoirs = [];
    const data = this.apiservice.get({
      user_id: this.authservice.admin
    },'admin_devoirs_ens');
    data.subscribe((res: any) => {
      this.all_devoirs = res.devoir
      this._result = res
      this.setDemandes()
      console.log(this.validated_devoirs);
      console.log(this.non_validated_devoirs);
      
      
      // this.group.value = undefined
      this.cdr.detectChanges();
      // this.sendNotification(res.non_validated_devoirs.length)
      this.dataIsLoad = false;
    });


  }

  setDemandes() {
    this.validated_devoirs = []
    this.non_validated_devoirs = []
    this.all_devoirs.forEach(elt => {
      if(elt.isValidated) {
        this.validated_devoirs.push(elt);
      } else {
        this.non_validated_devoirs.push(elt);
      }
    })
  }
  ionViewWillLeave() {
    this.group.value = undefined
  }
  getDevoirContent() {
    const devoirId = this.group.value;

    if (devoirId !== undefined) {
      this.contentIsLoad = true
      // console.log(this.contentIsLoad, "hello 2");
      //@ts-ignore
      const data = this.apiservice.get({
        user_id: this.authservice.admin,
        devoirId: devoirId
      },'admin_devoirs_ens');
      data.subscribe((elt) => {
        this.devoirContent = elt;
        setTimeout(() => {
          this.contentIsLoad = false;
          console.log(this.selectedElement);
          if(this.selectedElement !== undefined) {
            this.notificationService.openValidation(this.selectedElement, () => {})
            const btn = this.selectedElement.querySelector(".absolute") as IonButton
            btn.disabled = false
          }
        }, 100)
        this.cdr.detectChanges();
      })
    } else {
      setTimeout(() => {
        this.devoirContent = {};
      }, 300);
    }

  }

  //@ts-ignore
  valideDevoir($event: any, devoirId: number, action: string = null) {
    // $event.stopPropagation();
    const data = this.apiservice.get({
      user_id: this.authservice.admin,
      devoirId: devoirId,
      action: action
    },'admin_devoirs_ens');
    data.subscribe((res: any) => {
      this.group.value = undefined
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        let index = this.all_devoirs.findIndex(elt => +elt.Id === +devoirId);
        this.all_devoirs[index].isValidated = true
        this.all_devoirs[index].visible = res.visible
        this.setDemandes()
        eltRef.remove()
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }


  downloadPic($event: any, fileUrl: string, name: any) {
    $event.preventDefault();

    console.log(name);
    console.log(fileUrl);

    this.file.downloadImage(fileUrl, name)
  }

  downloadFile(fileUrl: string, name: any) {
    this.file.downloadFile(fileUrl, name)
  }


  seePdf(fileUrl: any, fileName : string) {
    const type = fileName.split(".")
    this.notificationService.openIFrame(fileUrl, fileName)
  }

  closeValidation(event: any, id: number) {
    const eltRef = event.target.closest('.validation');
    this.notificationService.closeValidation(eltRef, () => {})
  }

  async openValidation(event: any) {
    setTimeout(()=> {
      this.cdr.detectChanges();
      if(this.group.value !== undefined) {
        console.log(event.target.closest("ion-accordion"));
        
        const eltRef = event.target.closest("ion-accordion").querySelector(".validation")
        // const x = event.target.closest("ion-accordion")
        // console.log(x.querySelector(".validation"));
        this.selectedElement = eltRef
        console.log(this.selectedElement);
        console.log(eltRef);
        const btn = eltRef.querySelector(".absolute") as IonButton
        btn.disabled = true
      }
    }, 60)

  }

}
