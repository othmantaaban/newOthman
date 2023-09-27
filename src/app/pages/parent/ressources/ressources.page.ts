import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.page.html',
  styleUrls: ['./ressources.page.scss'],
})
export class RessourcesPage implements OnInit {
  tabTranslation: any;
  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
  ) {
    this.tabTranslation = {
      tab1: ' ',
      tab2: ' ',
    }
  }

  getData(): void {


    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
        pageKey: 'ressources',
      }, 'translations')
      .subscribe(
        (result: any) => {
          this.tabTranslation = result.translation;
          console.log(this.tabTranslation);
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
  }

  ionViewDidLoad() {
    //  this.pedaTabs.select(2);
    
  }

}
