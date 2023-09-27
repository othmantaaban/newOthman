import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { IonAccordionGroup, IonModal, ModalController, } from '@ionic/angular';
import { NotificationService } from '../admin/services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { GlobalService } from '../globalService/global.service';
// import { HTMLIonAlertElement } from ''
@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {
  private endPoint = "admin_demande_ens";
  dataIsLoad: boolean = false
  contentIsLoad: boolean = false
  // @ts-ignore
  @ViewChild('myAlert') myAlert: ElementRef;
  // @ts-ignore
  @ViewChild('demandAccordion') group : IonAccordionGroup;
  // @ts-ignore
  @ViewChild('collab') collab : IonModal;
  // @ts-ignore
  @ViewChild('statuts') modalStatus : IonModal;
  
  
  checkboxChecked = false
  listStatus = null
  status: any = null
  selectedStatus: any = null
  // @ts-ignore
  _result
  // @ts-ignore
  selectedResponsable : number
  // @ts-ignore
  collabModalVal : number

  // @ts-ignore
  commentair : string
  
  private allDemande : Array<any>= []
  public demandesValide : Array<any>= [];
  public demandesNonValide : Array<any>= [];
  public demandeContent : Object = {};
  public responsable : Array<any> = [];


  constructor(
    private modalCtrl: ModalController,
    private notificationService : NotificationService,
    private authservice : AuthService,
    private apiservice : ApiService
  ) {}
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.initialize()
  }

  ionViewWillLeave() {
    this.group.value= undefined
  }

  initialize() {
    this.dataIsLoad = true
    this.apiservice.get({
      user_id: this.authservice.admin,
    },this.endPoint)
    .subscribe(elt => {
      this.allDemande = elt.demande
      this.resetDemende()
      this.responsable = elt.responsable
      this.listStatus = elt.statuts
      this.dataIsLoad = false
      this._result = elt
    })
  }

  resetDemende() {
    this.demandesNonValide = []
    this.demandesValide = []
    this.allDemande.forEach((dem) => {
      if(dem.isValidated) {
        this.demandesValide.push(dem)
      } else {
        this.demandesNonValide.push(dem)
      }
    })
  }

  getDemandeContent() {
    const demandeId = this.group.value;

    if (demandeId !== undefined) {
      this.contentIsLoad =  true
      // @ts-ignore
      const data = this.apiservice.get({ 
        user_id: this.authservice.admin,
        demandeId: demandeId
       },this.endPoint)
      data.subscribe((elt) => {
        this.demandeContent = elt;
        this.status = elt.status
        this.selectedStatus = elt.status
        this.selectedResponsable = elt.responsable    
        this.collabModalVal = elt.responsable
        this.checkboxChecked = elt.responsable !== null ? true: false        
        this.commentair = elt.notes !== null ? elt.notes : "" 
        setTimeout(() => {
          this.contentIsLoad = false
        }, 500);
      })
    } else {
      this.demandeContent = {};
      this.status = null
      this.selectedStatus = null
      // @ts-ignore
      this.selectedResponsable = null    
      this.checkboxChecked = false
    }

  }

  validateDemande() {    
    console.log(this.selectedResponsable);
    if (this.selectedStatus != null) {
      console.log(this.checkboxChecked);
      
      let collab = this.checkboxChecked ? this.selectedResponsable : -1
      console.log(collab);
      
      const postDemende = this.apiservice.post({ 
        user_id: this.authservice.admin,
        status: this.selectedStatus,
         comment: this.commentair, 
         collab: collab ,  
         demandeId: this.group.value 
        }, this.endPoint) 
      postDemende.subscribe(elt => {
        // console.log(elt);
        // eltRef
        let indexNon = this.demandesNonValide.findIndex(ind => ind.id === this.group.value)
        let indexVal = this.demandesValide.findIndex(ind => ind.id === this.group.value)
        if(indexNon !== -1 && this.selectedStatus === 1 ) {
          this.demandesNonValide[indexNon].status = elt.status
          this.demandesNonValide[indexNon].responsable = elt.responsable
          this.demandesNonValide[indexNon].notes = elt.notes
          // this.resetDemende()
          this.notificationService.presentToast("demande valider avec success ", true)
        } else if(indexVal !== -1 && [2, 3, 4, 5].includes(this.selectedStatus)) {
          this.demandesValide[indexVal].status = elt.status
          this.demandesValide[indexVal].responsable = elt.responsable
          this.demandesValide[indexVal].notes = elt.notes
          this.notificationService.presentToast("demande valider avec success ", true)
        } else {
      // @ts-ignore
          let isValide
          if (indexVal != -1) {
            isValide = false           
          } else {
            isValide = true           
          }
      // @ts-ignore
          let eltRef = document.getElementById(`present-status-${this.group.value}`).closest("ion-col")
          this.notificationService.validateAnimation(eltRef, () => {
            let index = this.allDemande.findIndex(ind => ind.id === this.group.value)
      // @ts-ignore
            console.log(isValide);
            
      // @ts-ignore
            this.allDemande[index].isValidated = isValide
            this.group.value = undefined
            this.resetDemende()
      // @ts-ignore
            eltRef.remove()
            this.contentIsLoad =  true
            
            this.notificationService.presentToast("demande valider avec success ", true)
          })
        }
      })
    } else {
      this.notificationService.presentToast("demande STATUS is required", false)
    }
  }

  // partie etat
  async closeAlert() {
    this.closeModal()
  }
  async setChecked() {
    this.selectedStatus = this.status === undefined || this.status === null ? null : +this.status
    console.log(this.status);
    this.closeModal()
    
  }

  async closeModal() {
    // let top = await this.alertController.getTop()
    let top =  await this.modalCtrl.getTop()
    if(top) {
      await top.dismiss()
    }
  }
  
  ionDidDissmis() {
    // console.log(this.demandeContent["status"]);
    this.status = this.selectedStatus
    
  }


  // partie collab
  openModalCollab() {
    this.collab.present()
  }

  openModalStatus() {
    this.modalStatus.present()
  }
  collabCheckbox($event: any) {
    $event.stopPropagation()
    if(this.checkboxChecked) {
      // @ts-ignore
      this.selectedResponsable = this.demandeContent["responsable"] !== null ? this.demandeContent["responsable"]: this.responsable[0].Id
    } else {
      this.selectedResponsable = -1
    }
    this.collabModalVal = this.selectedResponsable
    // console.log(this.demandeContent["responsable"]);
    
    console.log(this.selectedResponsable);
    // console.log(this.collabModalVal);
    
    
    
  }

  async confirm() {
    let top = await this.modalCtrl.getTop() 
    if(top) {
      await top.dismiss(this.collabModalVal, "confirm")
    }
  }

  dismissCollabModal(event: any) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.selectedResponsable = this.collabModalVal
      
    } else {
      this.collabModalVal = this.selectedResponsable
    }

  }

  annulerDemende() {
    this.group.value = undefined
  }

} 
