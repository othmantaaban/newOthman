import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, IonButton } from '@ionic/angular';
import { NotificationService } from '../admin/services/notification.service';
import { FileService } from 'src/app/services/file.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { FileService } from '../globalService/file.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {
//@ts-ignore
  @ViewChild('ressourceAccordion') group: IonAccordionGroup;

  endPoint : string = "admin_ressource_ens"

  _result : any

  accordionVal: any = null;
  messageSuccess: string = '';
  all_ressources: Array<any> = [];
  validated_ressources: Array<any> = [];
  non_validated_ressources: Array<any> = [];
  ressourceContent: Object = {};
  contentIsLoad: boolean = false;
  dataIsLoad: boolean = false;
  ressources: Array<any> = []
  selectedElement = null


  constructor(
    private notificationService: NotificationService,
    private file: FileService,
    private cdr: ChangeDetectorRef,
    private authservice: AuthService,
    private apiService : ApiService
  ) { }

  private sendNotification(countNot: number) {

    this.notificationService.getNotification(JSON.stringify({ ressource: countNot }))
  }

  ngOnInit(): void {
    this.dataIsLoad = true;

  }

  ionViewWillEnter() {
    this.dataIsLoad = true;
    this.initialize();
  }

  ionViewWillLeave() {
    this.group.value = undefined
  }
  initialize() {
    this.non_validated_ressources = [];
    this.validated_ressources = [];
    // const data = this.ressourcesService.getRessources();
    const data = this.apiService.get({
      user_id: this.authservice.admin,
    }, this.endPoint);
    data.subscribe((res: any) => {
      this.all_ressources = res.ressources
      this._result = res
      this.setRessource()
      this.group.value = undefined
      this.cdr.detectChanges();
      this.dataIsLoad = false
    });
  }

  setRessource() {
    this.validated_ressources = []
    this.non_validated_ressources = []
    this.all_ressources.forEach(elt => {
      if(elt.isValidated) {
        this.validated_ressources.push(elt)
      } else {
        this.non_validated_ressources.push(elt)
      }
    })
  }
  getRessourceContent() {
    const ressourceId = this.group.value;
    if (ressourceId !== undefined) {
      this.contentIsLoad = true;

  // const data = this.ressourcesService.getRessourceContent(+ressourceId);
      const data = this.apiService.get({
        user_id: this.authservice.admin,
        ressourceId : ressourceId
       }, this.endPoint);
      data.subscribe((elt) => {
        this.ressourceContent = elt;
        setTimeout(() => {
          this.contentIsLoad = false;
          if(this.selectedElement !== null) {
            this.notificationService.openValidation(this.selectedElement, () => {})
            //@ts-ignore
            const btn = this.selectedElement.querySelector(".absolute") as IonButton
            btn.disabled = false
          }
        }, 100);
        this.cdr.detectChanges();
        console.log("done", new Date());
      })
    } else {
      this.selectedElement = null
      this.ressourceContent = {};
    }

  }

  //@ts-ignore
  valideRessource($event:any, ressourceId: number, action: string = null) {
    // const data = this.ressourcesService.setRessourceValid(ressourceId, action);
    let request = {
      user_id: this.authservice.admin,
      ressourceId: ressourceId,
      action: action
    }

    const data = this.apiService.post(request, this.endPoint);
    data.subscribe((res: any) => {
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        let index = this.all_ressources.findIndex(elt => +elt.Id === +ressourceId)
        this.all_ressources[index].isValidated = true
        this.all_ressources[index].visible = res.visible
        this.setRessource()
        console.log(eltRef);
        eltRef.remove()
        this.group.value = undefined
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }


  downloadFile(fileUrl: string, name:any) {
    this.file.downloadFile(fileUrl, name)
  }

  seePdf(fileUrl:any, fileName : string) {
    const type = fileName.split(".")
    this.notificationService.openIFrame(fileUrl, fileName)
  }

  closeValidation(event: any, id: number) {
    const eltRef = event.target.closest('.validation');
    this.notificationService.closeValidation(eltRef, () => {})
  }

  async openValidation(event:any) {
    console.log(this.group.value);
    console.log(this.group.value !== undefined);

    setTimeout(()=> {
      this.cdr.detectChanges();
      if(this.group.value !== undefined) {
        const eltRef = event.target.closest("ion-accordion").querySelector(".validation")
        console.log(this.group.value);
        this.selectedElement = eltRef
        const btn = eltRef.querySelector(".absolute") as IonButton
        
        btn.disabled = true
      }
      }, 100)


  }
  splitFileNameToArray(name: string): string[] {
    return name.split('.');
  }


}
