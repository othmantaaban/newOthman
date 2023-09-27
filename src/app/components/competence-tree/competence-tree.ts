import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { ModalController } from 'ionic-angular';
import { PreviewMediaComponent } from '../../components/preview-media/preview-media.component';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'competence-tree',
  templateUrl: 'competence-tree.html'
})
export class CompetenceTreeComponent implements OnInit {
  // @ts-ignore
  // @ViewChild(AccordionComponent) accordion;

  @Output() checkChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() selectable = false;
  @Input() data = [];
  @Input() niveaux = [
    {
      id: "",
      color: "",
      value: "",
    }
  ];
  // public ids = [];
  // @ts-ignore
  @ViewChild('acc') accordion;

  // @ts-ignore
  @ViewChild('childTree') childTree;

  checkedBoxes = [];

  constructor(
    private modalController: ModalController
  ) {
    this.data.map((item:any) => {
      console.log(item);
      return item.id;
    })
  }

  ngOnInit() {
  }

  updateChecks(id:never) {
    let index = this.checkedBoxes.indexOf(id);
    if (index < 0) {
      this.checkedBoxes.push(id);
    } else {
      this.checkedBoxes.splice(index, 1);
    }
    this.checkChange.emit(this)
    // console.log(this.getValue())
  }

  getValue() {
    let values: any[] = [];
    this.checkedBoxes.map((elem) => {
      if (values.indexOf(elem) < 0)
        values.push(elem);
    })

    if (this.childTree) {
      this.childTree.getValue().map((elem:any) => {
        if (values.indexOf(elem) < 0)
          values.push(elem);
      })
    }

    return values;
  }

  triggerChange() {
    this.checkChange.emit(this);
  }

  checktoggle($event:any) {
    let panel = this.accordion.panels.filter((pan:any) => {
      return pan.id == $event.panelId;
    })
    if (panel.length > 0 && panel[0].type == 'false') {
      $event.preventDefault();
    }
  }

  async showProof(proof:any) {
    let previewImage = await this.modalController.create({
      component: PreviewMediaComponent,
      componentProps: {
        images: [
          {
            image_path: proof,
            video_path: null
          }
        ],
        imageIdx: 0
      }
    });

    previewImage.present();
    // let modal = this.modalController.create(ImagesPreviewModalComponent,{
    //   imageIdx: 0,
    //   images: this.album.images
    // })
  }
}
