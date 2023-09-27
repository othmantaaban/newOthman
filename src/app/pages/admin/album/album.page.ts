import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertButton, AlertController, IonAccordionGroup, IonButton, IonIcon, IonSlides, IonicSlides } from '@ionic/angular';
import { NotificationService } from '../admin/services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// import Swiper from 'swiper';
// import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  swiperModules = [IonicSlides]
  private endPoint = "admin_album_ens";
  //@ts-ignore
  @ViewChild('albumAccordion') group: IonAccordionGroup;
  @ViewChild('swiperContainer') swiperContainerRef!: IonSlides;
  PaginationConfig = {
    type: 'custom',
    renderCustom: (swiper: any, current: any, total: any) => {
      const swiperParent = swiper.el.previousElementSibling;

      swiperParent.innerHTML = `
        <ion-img src='assets/imageIcon.svg'></ion-img>
        <span>
          <span style='font-weight: bold;'>${current}/</span>
          <span >${total}</span>
        </span>
      ` ;
      return null
    },
  };

  firstCall = true;
  albums: Array<any> = [];
  albumContent: Object = {};
  contentIsLoad: boolean = false
  // @ts-ignore
  _result
  activeIndex: number = 1
  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private alert: AlertController,
    private authservice: AuthService,
    private apiService : ApiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initialize()
  }

  ionViewWillLeave() {
    this.group.value = undefined
  }

  initialize() {
    const data = this.apiService.get({}, this.endPoint)

    data.subscribe(elt => {
      this.albums = elt.non_validated_albums
      console.log(elt);
      
      this._result = elt
    })
  }

  goToNext(swiperRef: any) {
    const swiperElt = document.querySelector(`#${swiperRef}`) as any;
    const swiper = swiperElt.swiper
    // console.log();
    // swiper.pagination = this.PaginationConfig
    // console.log(swiper.pagination);

    console.log(swiper);

    swiper.slideNext()
  }
  goToPrev(swiperRef: any) {
    const swiperElt = document.querySelector(`#${swiperRef}`) as any;
    const swiper = swiperElt.swiper
    swiper.slidePrev()
  }


  //@ts-ignore
  valideAlbum($event: any, albumId: number, action: string = null) {
    // $event.stopPropagation();
    // const data = this.albumService.setAlbumValid(devoirId, "validation", action);
    let request = {
      user_id: this.authservice.admin,
      id: albumId,
      action: action,
      value: "validation"
    }
    const data = this.apiService.post(request, this.endPoint)
    data.subscribe((res: any) => {
      const eltRef = $event.target.closest('ion-col');
      this.notificationService.validateAnimation(eltRef, () => {
        this.initialize()
        eltRef.remove()
        this.notificationService.presentToast(res.msg, res.valide)
      })
    });
  }

  getAlbumContent() {
    const albumId = this.group.value

    this.contentIsLoad = true

    if (albumId !== undefined) {
      const data = this.apiService.get({
        user_id: this.authservice.admin,
        albumId : albumId
      }, this.endPoint)
      
      data.subscribe(elt => {
        this.albumContent = elt
        console.log(this.albumContent);
        this.contentIsLoad = false
      })
    } else {
      this.albumContent = {}
    }
  }

  async removePic(id:any,index: any) {
    // const buttons : AlertButton = 
    const alertRemove = await this.alert.create({
      header: "Êtes-vous sûr?",
      subHeader: "Vous ne pourrez pas récupérer!",
      buttons: [
        {
          text: "Oui je suis sûr!",
          handler: () => {
            // const data = this.albumService.setAlbumValid(id, "deletePic");
            const data = this.apiService.post({ 
              user_id: this.authservice.admin,
              id: id, 
              action: "deletePic"
            }, this.endPoint);
            console.log(id);
            
            data.subscribe(res => {

              //@ts-ignore
              this.albumContent['images'].splice(index,1);
              console.log(this.albumContent);
              this.notificationService.presentToast(res.msg, res.valide)

            })
          }
        },
        {
          text: "Non, annulez-le!",
          handler: async () => {
            await this.alert.dismiss()
          }
        }
      ]
    })

    alertRemove.present()
  }
}
