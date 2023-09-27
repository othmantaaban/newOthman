import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-slider',
  templateUrl: './modal-slider.component.html',
  styleUrls: ['./modal-slider.component.scss'],
})
export class ModalSliderComponent implements OnInit {

  @Input('key') key: any = undefined;

  // @ts-ignore
  @ViewChild("video") video :  ElementRef;
  // @ts-ignore
  @ViewChild("swiper") swiper :  IonSlides;
  // @ts-ignore
  @ViewChild("Content") ionContent :  IonContent;

  slides: any[] = [];

  activeIndex : number = 0;

  // @ts-ignore
  backgroundColor : string;
  // @ts-ignore
  logo : string;
  // @ts-ignore
  title : string;

  constructor(
    private modal : ModalController,
    private apiservice: ApiService,
    private authservice: AuthService,
    private sanitizer: DomSanitizer,
  ) { }

  getData(){
    this.apiservice.get({
      user_id: this.authservice.user,
      token: this.authservice.token,
      key: this.key,
    },'slides_content').subscribe((result)=>{
      this.slides = result.slides;
      this.logo = result.logo;
      this.title = result.title;
    });
  }

  ngOnInit() {
    this.getData()
  }

  setActiveIndex(i : number) {
    console.log(i);
    this.swiper.slideTo(i)
    
  }

  async slideToNext() {
    let isEnd = await this.swiper.isEnd()
    console.log(isEnd);
    this.swiper.options.allowSlideNext = true
    console.log(this.swiper.options.allowSlideNext);
    
    if(!isEnd) {
      this.swiper.slideNext();
    }else{
      this.closeModal();
    }
    this.swiper.options.allowSlideNext = false
  }

  async closeModal() {
    await this.modal.dismiss()
    // await modal?.dismiss()
  }

  getSanitizedUrl(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
