import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-pfe',
  templateUrl: './pfe.page.html',
  styleUrls: ['./pfe.page.scss'],
})
export class PfePage implements OnInit {
  // @ts-ignore
  @ViewChild(IonContent) content : IonContent;


  _result = {
    translation : {
      "title" : "Projet de fin d'études",
      "debut": "Début",
      "fin": "Fin"
    }
  }

  visible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setRibVisble() {
    this.visible = !this.visible
  }

  scrollToItem() {
    const element = document.getElementById("encadrement");
    
    if (element) {
      // this.content.scrollToPoint(0, element.offsetTop, 500);
      this.content.scrollToPoint(0, element.offsetTop, 1000)
    }
  }


}
