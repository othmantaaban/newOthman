import { Component, Input, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-paiements-tabs',
  templateUrl: './paiements-tabs.page.html',
  styleUrls: ['./paiements-tabs.page.scss'],
})
export class PaiementsTabsPage implements OnInit {
  // @ts-ignore
  @Input('tabs') tabs: IonTabs;

  tab_groupe: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
  ) {
    this.tab_groupe = {
      'etat_paiement': {
        'title': '',
        'icon': '',
        'visible': true,
      },
      'historique': {
        'title': '',
        'icon': '',
        'visible': true,
      },
      'info_bancaire': {
        'title': '',
        'icon': '',
        'visible': true,
      },
      'dossier': {
        'title': '',
        'icon': '',
        'visible': false,
      }
    };
  }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.parentservice.parentId,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        pageKey: 'paiement_tabs',
      }, 'translations')
      .subscribe(
        (result: any) => {
          this.tab_groupe = result.tabs;
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  updateTitle() {
    console.log(this.tabs);

  }

  ngOnInit(): void {
    this.getData();
  }

  ionViewDidLoad() {

    //  this.pedaTabs.select(2);
    //  if(this.navParams.get('tabIndex')) {
    //   this.pedaTabs.select(this.navParams.get('tabIndex'));
    //   //  this.tabIndex = this.navParams.get('tabIndex');
    //  }
    console.log('ionViewDidLoad MenuTabsPage');
  }

}
