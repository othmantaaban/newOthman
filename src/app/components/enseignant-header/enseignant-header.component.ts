import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-enseignant-header',
  templateUrl: './enseignant-header.component.html',
  styleUrls: ['./enseignant-header.component.scss'],
})
export class EnseignantHeaderComponent implements OnInit {

  @Input('title') title = '';
  @Input('isRoot') isRoot = false;
  @Input('mode') mode = 'md';

  @Input('backTo') backTo = null;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public location: Location 
  ) {

  }

  ngOnInit() {}

  back(){
    if(this.backTo){
      this.navCtrl.navigateRoot([this.backTo]);
    }else{
      this.location.back()
    }
  }
}
