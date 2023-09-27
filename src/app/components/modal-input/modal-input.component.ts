import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
})
export class ModalInputComponent implements OnInit {
  @Input('valueOf') valueOf = 'text';
  @Input('title') title = 'Veuillez entrer la valeur';

  value :any;
  url :any;


  constructor(private modalCtrl: ModalController,private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  sanUrl(event:any){

    if(this.valueOf!='youtube' && this.valueOf!='link')
      return this.url = null

    let link = event.target.value;
    if(this.valueOf == 'youtube'){
      let idvideo = '';
      if(link.includes('v=')){
        idvideo = link.split('?').filter((item:string)=>item.includes('v='))[0]?.split('=').pop();
      }else{
        idvideo = link.split('/').pop();
      }
      // console.log(idvideo)
      if(!link){
        return this.url = null
      }
      if(idvideo){
        this.value = 'https://www.youtube.com/embed/'+idvideo
        console.log(this.url)
      }
    }
    return this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.value)

  }

  confirm() {
    return this.modalCtrl.dismiss(this.value, 'confirm');
  }
}
