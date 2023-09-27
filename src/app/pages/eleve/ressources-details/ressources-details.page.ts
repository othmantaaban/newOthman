import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';
import { FileService } from 'src/app/services/file.service';
import { Browser } from '@capacitor/browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ressources-details',
  templateUrl: './ressources-details.page.html',
  styleUrls: ['./ressources-details.page.scss'],
})
export class RessourcesDetailsPage implements OnInit {
  result: any;
  translation: any;
  description: any;

  constructor(    
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private ft: FileService,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private route: ActivatedRoute
  ) {
    
  }

  
  getData(): void {
    this.apiSerivce
      .get(
        {
          user_id : this.authservice.user,
          parent_id : this.parentservice.parentId,
          eleve_id : this.parentservice.currentEleve.id,
          key  : this.authservice.token,
          ressource : this.route.snapshot.queryParamMap.get('id')
        },
        'ressource_details'
      )
      .subscribe(
        (result) => {
          let res: any = result;
          this.result = res.data;
          this.translation = res.translation;
          this.description = this.getInnerHTMLValue();
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.getData();
  }

  getInnerHTMLValue() {
    return this.sanitizer.bypassSecurityTrustHtml(this.result.description);
  }
  
  downloadFile(file:any) {
    this.ft.downloadFile(file.link,file.name);
  }
  sanitizeUrl(link: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  async iabOpen(link:string){
    return await Browser.open({url:link});
  }

}
