import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit {
  @Input('showArrow') showArrow : boolean = false;

  @Input('open') open:boolean = false;

  @Input('disabled') disabled:boolean = false;

  constructor() { }

  ngOnInit() {}
  
  toggleAccordion(event: Event){
    event.preventDefault();

    if(!this.disabled)
    this.open = !this.open;
    
  }
}
