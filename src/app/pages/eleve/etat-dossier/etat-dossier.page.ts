import { Component, OnInit } from '@angular/core';
import { Chart,ChartItem,registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

Chart.register(...registerables)

@Component({
  selector: 'app-etat-dossier',
  templateUrl: './etat-dossier.page.html',
  styleUrls: ['./etat-dossier.page.scss'],
})
export class EtatDossierPage implements OnInit {
   // @ts-ignore
  // @ViewChild("doughnut") doughnut: DoughnutComponent

  // @ts-ignore
  _result;
  percent: number = 0
  mainColor: string="#2ED08B" 
  backColor: string="#EDEDED" 
  textColor: string="#12122C" 
  fontSize: number = 30
  letterSpacing: number = -0.906
  fontWeight: number = 600

  visible: boolean = false;

  // 
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.doughnut.ngOnInit()
    this.apiService.get(
      {
        user_id: this.authService.eleve
      }
      , "sup_suivi_dossier")
    .subscribe((elt : any) => {
      this._result = elt;
      this.percent = elt.percent.toFixed(0)

      
      
      // this.initChart()
    })
  }

  ionViewWillLeave() {
    // this.doughnut.ngOnDestroy()
  }




}
