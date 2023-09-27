import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  
  @Input('open') open:boolean = false;

  constructor() { }

  ngOnInit() {}

  toggleAccordion(event: Event){
    event.preventDefault();
    this.open = !this.open;
  }

}
