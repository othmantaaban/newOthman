import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.page.html',
  styleUrls: ['./devoir.page.scss'],
})
export class DevoirPage implements OnInit {
  result: any;
  translation: any;
  devID: any;
  type: any;
  description: any;
  // eleve: any;

  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    private sanitizer: DomSanitizer,
    private ft: FileService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,

  ) {
    // this.eleve = ApiService.activeEleve;
    //@ts-ignore
    this.devID = this.route.snapshot.queryParamMap.has('result')?JSON.parse(this.route.snapshot.queryParamMap.get('result')).id:null;
    this.type = this.route.snapshot.queryParamMap.get('type');
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          type: 'devoir',
          devoir: this.devID,
        },
        'prof_devoir_details'
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

  ionViewDidLoad() {}

  downloadFile(file:any) {
    this.ft.downloadFile(file.link,file.name);
  }

  editDevoir(devoir:any) {
    let content = {
      id: devoir.id,
      classes: devoir.classesIds ? devoir.classesIds.split(',') : null,
      matiere: devoir.matiereId,
      titre: devoir.title,
      description: devoir.description,
      type: this.type,
      image: devoir.image,
      // file: devoir.file ? devoir.file.link : null,
      files: devoir.files,
      date: devoir.date,
      individuel: devoir.devoirIndividuel,
    };

    let eleves = [];

    if (devoir.eleves && devoir.eleves.length > 0) {
      for (let index = 0; index < devoir.eleves.length; index++) {
        const element = devoir.eleves[index];
        eleves.push({
          id: element.id,
          nom: element.nom,
          photo: element.picture,
        });
      }
    }

    if (this.type == 'devoir') {
      this.navCtrl.navigateForward(['/enseignant/devoirs-form'], {
        queryParams: {
          content: JSON.stringify(content),
          type: this.type,
          eleves: JSON.stringify(eleves),
        }
      });
    } else {
      this.navCtrl.navigateForward(['/enseignant/ressources-form'], {
        queryParams: {
          content: JSON.stringify(content),
          type: this.type,
          eleves: JSON.stringify(eleves),
        }
      });
    }
  }

  async deleteDevoir(devoir:any) {
    const confirm = await this.alertCtrl.create({
      header:
        this.translation && this.translation.alertConfirmDelete
          ? this.translation.alertConfirmDelete.title
          : 'Vous êtes sûr ?',
      message: `Vous êtes sûr de vouloir supprimer ce ${this.type=='devoir'?'devoir':'ressource'} ?`,
      buttons: [
        {
          text: 'Non',
          handler: () => {
            // console.log('Disagree clicked');
          },
        },
        {
          text: 'Oui',
          handler: () => {
            this.apiSerivce
              .post({
                enseignant_id: this.authservice.enseignant ,
                delete:1,
                content: JSON.stringify(devoir)
              }  ,'prof_content'
              )
              .subscribe(
                (result) => {
                  this.navCtrl.navigateRoot(['/enseignant']).then(()=>{
                    this.navCtrl.navigateForward(['/enseignant/devoirs'], { queryParams: { type: this.type } });
                  });
                },
                (error) => {}
              );
          },
        },
      ],
    });
    confirm.present();
  }

  sanitizeUrl(link: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  async iabOpen(link:string){
    return await Browser.open({url:link});
  }
}
