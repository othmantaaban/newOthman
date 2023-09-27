import { Component, Input, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-suivi-pedagogique',
  templateUrl: './suivi-pedagogique.page.html',
  styleUrls: ['./suivi-pedagogique.page.scss'],
})
export class SuiviPedagogiquePage implements OnInit {
  // @ts-ignore
  @Input('tabs') tabs : IonTabs;

  show_tabs:any;
  tabTranslation:any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
  ) { 
    this.tabTranslation = {
      'title' : ' ',
      'tab1' : ' ',
      'tab2' : ' ',
      'tab3' : ' ',
      'tab4' : ' ',
      'tab5' : ' ',
    };
  }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
        pageKey: 'suivi_pedagogique',
      }, 'suivi_pedagogique')
        .subscribe(
            (result:any) => {
              this.tabTranslation = result.translation;
              this.show_tabs = result.show_tabs;
              console.log(this.show_tabs)
            }
              ,
            error => console.log("Erreur :: " + error)
        )
  }

  updateTitle(){
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
