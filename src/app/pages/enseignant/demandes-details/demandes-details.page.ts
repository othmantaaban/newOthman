import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-demandes-details',
  templateUrl: './demandes-details.page.html',
  styleUrls: ['./demandes-details.page.scss'],
})
export class DemandesDetailsPage {
  demande: any = [];
  translation: any = [];
  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public apiSerivce: ApiService
  ) { 
    //@ts-ignore
    this.demande = JSON.parse(this.route.snapshot.queryParamMap.get("demande"));    
    this.translation = JSON.parse(this.route.snapshot.queryParamMap.get("translation") as string);
    console.log(this.translation);
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailsDemandePage");
  }
  private jQueryInit() {
    /* var self = this; */
    /*
    $(this.elRef.nativeElement).ready(function() {
    });
   
   $('nav').scroll(function(){

      if($(document).offsetTop > 0){
          alert('test');
      }
   });

   */
  }
  ngAfterViewInit() {
    this.jQueryInit();
  }
  nouvelle_demande() {
    this.navCtrl.navigateForward(['/enseignant/demandes-form']);
  }

  getColor(etat:any) {
    switch (etat) {
      case "En Cours": {
        return "en-cours";
      }
      case "Traitée": {
        return "cloturee";
      }
      case "Bloquée": {
        return "refusee";
      }
      case "Nouvelle": {
        return "nouvelle";
      }
      case "Accepté": {
        return "accepte";
      }
      case "Livrée": {
        return "livree";
      }
      default: {
        return "en-cours";
      }
    }
  }

}
