import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  result: any;

  constructor(
    private apiservice: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.apiservice.get({},'slides').subscribe(
      res => {
        this.result = res;
      }
    )
  }

  goConnexion(){
    this.router.navigate(['/connexion'],{ replaceUrl: true });
  }

}
