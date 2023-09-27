import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.page.html',
  styleUrls: ['./parent.page.scss'],
})
export class ParentPage implements OnInit {

  public appPages: any[] = [];

  public eleve: any = null;

  public eleves: any[] = [];

  constructor(
    private parentService: ParentService,
    private nav: NavController,
    private router: Router,
  ) {
    this.appPages = Object.values(this.parentService.menu);
  }

  ngOnInit() {
    this.eleve = this.parentService.currentEleve;
    this.eleves = this.parentService.eleves;
  }

  switchTo(eleve:any){
    console.log(eleve);
    this.parentService.switchEleve(eleve).then(()=>{
      this.ngOnInit()
    })
    
  }
}
