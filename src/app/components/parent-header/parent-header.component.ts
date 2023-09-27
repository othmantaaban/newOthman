import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-parent-header',
  templateUrl: './parent-header.component.html',
  styleUrls: ['./parent-header.component.scss'],
})
export class ParentHeaderComponent implements OnInit {

  @Input('title') title = '';
  @Input('isRoot') isRoot = false;

  public eleve : any = null;

  constructor(
    private parentService: ParentService,
    public router: Router,
    public location: Location 
  ) {
    this.eleve = this.parentService.currentEleve;

  }

  ngOnInit() {}

}
