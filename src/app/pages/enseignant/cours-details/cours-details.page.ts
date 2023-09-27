import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.page.html',
  styleUrls: ['./cours-details.page.scss'],
})
export class CoursDetailsPage implements OnInit {
  cours: any;
  tabIndex = 0;
  tabs: any;

  headerTitle = ''

  translation: any = {
    absence: "a",
    cahier_texte: "b",
  };
  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private storage: Storage,
    private route: ActivatedRoute
    ) { 
      
      let cours = this.route.snapshot.queryParamMap.get('cours')
      
      if(cours)
      this.sendData(JSON.parse(cours));
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfCoursDetailTabsPage");
  }

  getData(): void {
    this.apiservice
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          pageKey: "prof_cours_details",
        },
        "translations"
      )
      .subscribe(
        (result: any) => {
          console.log(this.translation);
          this.translation = {
            absence: result.absence,
            cahier_texte: result.cahier_texte,
          };
          this.tabs = {
            can_see_absence : result.can_see_absence,
            can_see_cdt : result.can_see_cdt
          }
          this.headerTitle = `<b>${this.cours.classe}</b><br><small style="font-size: 10px;"> ${this.cours.date} ${this.cours.creneau} </small>`
        },
        (error) => console.log("Erreur :: " + error)
      );
  }

  ngOnInit(): void {
    this.getData();
  }

  sendData(data:any) {
    this.cours = data;
    this.storage.set("cours", data);
  }
}
