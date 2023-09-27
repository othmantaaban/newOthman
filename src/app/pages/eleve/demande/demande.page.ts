import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage {
  demande:any;
  translation:any;

  constructor(
    private route :ActivatedRoute,
    private router : Router,
    private fs : FileService
  ) {
    this.demande=this.route.snapshot.queryParamMap.get('demande');
    if(this.demande){
      this.demande = JSON.parse(this.demande);
    }
    this.translation=this.route.snapshot.queryParamMap.get('translation');
    if(this.translation){
      this.translation = JSON.parse(this.translation);
    }
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsDemandePage');
  }
  private jQueryInit() {

  }
  ngAfterViewInit() {
    this.jQueryInit();
  }
  nouvelle_demande(){
    this.router.navigate(['/eleve/nouvelle-demande']);
    //  this.navCtrl.push(NouvelleDemandePage);
  }
  
  getColor(etat:any){
    switch(etat) { 
      case 'En Cours': { 
          return "en-cours";
          
      } 
      case 'Traitée': { 
          return "cloturee"; 
        
      } 
      case 'Bloquée': { 
          return "refusee"; 
      } 
      case 'Nouvelle': { 
          return "nouvelle";
      } 
      case 'Accepté': { 
          return "accepte";
      }
      case 'Livrée': { 
          return "livree";
      }
      default: { 
        return "en-cours";
      } 
   }
  }


  downloadFile(file: any) {
    this.fs.downloadFile(file.link,file.name)
    // this.ft.downloadFile(file.text, file.link);
  }

}
