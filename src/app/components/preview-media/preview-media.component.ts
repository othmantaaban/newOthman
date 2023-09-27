import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.scss'],
})
export class PreviewMediaComponent implements OnInit {
  // @ts-ignore: Unreachable code error
  @Input() images: any[];
  @Input() imageIdx: any;

  

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(){
    console.log('preview media ',this.images,this.imageIdx)

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  next(){
    if(this.imageIdx < (this.images.length-1)){
      this.imageIdx++;

    }else{
      this.imageIdx = 0;
    }
  }

  prev(){
    if(this.imageIdx > 0){
      this.imageIdx--;
    }else{
      this.imageIdx = this.images.length - 1;
    }
  }
}
