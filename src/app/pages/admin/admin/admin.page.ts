import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonSlides } from '@ionic/angular';
import { NotificationService } from './services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //@ts-ignore
  @ViewChild('notificationIcon', { static: true }) notificationIcon: ElementRef;

  //@ts-ignore
  @ViewChild('mySlider') slider: IonSlides;
  endPoint: string = "admin_notification_ens"

  notification: any = {
    devoir: 0,
    evaluation: 0,
    discipline: 0,
    ressource: 0,
    message: 0,
    demande: 0,
    album: 0,
    absence: 0,
  }

  // @ts-ignore
  _result: any;
  disciplinces: number = 0;
  demande: number = 0;
  album: number = 0;
  absences: number = 0;
  ressource: number = 0;
  devoirs: number = 0;
  messages: number = 0;
  evaluation: number = 0;

  currentSlideIndex = 0;

  user: any;
  parent: any;
  pick: any;
  pointage: any;
  enseignant: any;

  constructor(
    private notificationService: NotificationService,
    private animationCtrl: AnimationController,
    private apiservice: ApiService,
    private authservice: AuthService
  ) {
    this.parent = this.authservice.parent;
    this.pick = this.authservice.pick;
    this.pointage = this.authservice.pointage;
    this.enseignant = this.authservice.enseignant;
  }


  ionViewWillEnter() {
    this.onchange()
    console.log(this.authservice);
    
    this.apiservice.get({
      user_id: this.authservice.user
    }, this.endPoint)
      .subscribe(async (elt) => {
        this._result = elt;
        console.log(this._result);

        let { disciplinces, absences, demande, album, ressource, devoirs, messages } = elt
        this.disciplinces = disciplinces
        this.demande = demande
        this.album = album
        this.absences = absences
        this.ressource = ressource
        this.devoirs = devoirs
        this.messages = messages

        this.user = this._result.user;

        let swiper = await this.slider.getSwiper()
        setTimeout(() => this.startIntroAnimation(swiper), 1000);
        setTimeout(() => {
          let elt = document.getElementById("helloTest")
          const animation = this.animationCtrl.create()
            //@ts-ignore
            .addElement(elt)
            .duration(4000)
            .delay(1000)
            .easing("cubic-bezier(.36,.07,.19,.97)")
            .iterations(Infinity);

          console.log(animation);

          animation.keyframes([
            { transform: 'translate3d(-1px, 0, 0)', offset: 0.1 },
            { transform: 'translate3d(2px, 0, 0)', offset: 0.2 },
            { transform: 'translate3d(-4px, 0, 0)', offset: 0.3 },
            { transform: 'translate3d(4px, 0, 0)', offset: 0.4 },
            { transform: 'translate3d(-4px, 0, 0)', offset: 0.5 },
            { transform: 'translate3d(4px, 0, 0)', offset: 0.6 },
            { transform: 'translate3d(-4px, 0, 0)', offset: 0.7 },
            { transform: 'translate3d(2px, 0, 0)', offset: 0.8 },
            { transform: 'translate3d(-1px, 0, 0)', offset: 0.9 },
          ]);


          animation.play();
        }, 1000)
      })
  }

  startIntroAnimation(swiper: any): void {
    // Slide to the end of the carousel slowly
    swiper.allowTouchMove = false;

    swiper.slideTo(swiper.slides.length - 1, 2000, false);


    setTimeout(() => {

      swiper.slideTo(0, 500);
      swiper.allowTouchMove = true;


      // console.log(swiper.activeIndex);
    }, 2500);
  }
  onchange() {
    console.log("dashboard");
  }

  slidechange() {


  }

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification: any) => {
      let all = JSON.parse(notification)
      let key = Object.keys(all)[0]
      let val = all[key]
      //@ts-ignore
      this.notification[key] = val
      // Perform any desired actions in the parent component
    });
  }


  parentFunction() {
    console.log('Parent function executed!');
    // Perform any desired actions in the parent component
  }

  logout(){
    this.authservice.logout();
  }

  goToAcces(acces: string){
    this.authservice.goToHome(acces)
  }
}
