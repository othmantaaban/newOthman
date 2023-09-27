import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-etat-paiements',
  templateUrl: './etat-paiements.page.html',
  styleUrls: ['./etat-paiements.page.scss'],
})
export class EtatPaiementsPage {

  // @ts-ignore
  _result;


  mainColor: string="#2ED08B" 
  backColor: string="#EDEDED" 
  textColor: string="#12122C" 
  // @ts-ignore
  percent: number;
  fontSize: number = 44
  letterSpacing: number = -0.906
  fontWeight: number = 600

  visible: boolean = false;


  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private modal : ModalController
  ) { }

  ngOnInit() {
  }

  setRibVisble() {
    this.visible = !this.visible
  }

  // ionViewDidEnter() {
  ionViewWillEnter() {
    this.apiService.get(
      {
        user_id: this.authService.eleve
      }
      , "sup_etat_paiement")
    .subscribe(elt => {
      this._result = elt;
      this.percent = elt.ptc.toFixed(0)
      // this.initChart()
    })      
  }

  
  async cancel() {
    let md = await this.modal.getTop()

    await md?.dismiss()
  }


  displayRibs(str : string) {
    let result = str.replace(/\s/g, '')
    return result.replace(/(.{4})/g, "$1 ");
  }
  
}
