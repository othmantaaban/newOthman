import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ParentService } from 'src/app/services/parent.service';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Browser } from '@capacitor/browser';
import { PreviewMediaComponent } from 'src/app/components/preview-media/preview-media.component';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {

  // @ts-ignore: Unreachable code error
  audioPlayer: MediaObject;

  eleve: any;
  _result: any;
  ressources: any;
  loading: any;

  constructor(
    private navCtrl: NavController,
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private fileservice: FileService,
    private modalController: ModalController,
    private media: Media,
    private cd: ChangeDetectorRef
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
        unite: this.route.snapshot.queryParamMap.get('unite'),
      }, 'bibliotheque')
      .subscribe(
        result => {
          this._result = result;
          this.ressources = this._result.data;
          console.log(this._result.data);
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      );

  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(()=>{
      this.getData();
    });
  }
  ionViewDidLoad() {
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      mode: 'ios',
      duration: 10000
    });
    this.loading.present();
  }

  async preview(file: any) {
    console.log(file.mime.type.split('/')[0])
    let preview: HTMLIonModalElement;
      switch (file.mime.type.split('/')[0]) {
        case 'application':
          if(file.mime.ext == 'pdf'){
            let url = 'https://docs.google.com/viewer?url=' + encodeURIComponent(file.path);
            Browser.open({url});
          }
  
          break;
        case 'image':
          
          preview = await this.modalController.create({
            component: PreviewMediaComponent,
            componentProps: {
              imageIdx: 0,
              images: [
                { 
                  image_path : file.path,
                  video_path : null 
                }
              ]
            }
          });
          preview.present();
            // let previewImage = this.modalController.create(ImagesPreviewModalComponent,{
            //   images: [
            //     { 
            //       image_path : file.path,
            //       video_path : null 
            //     }
            //   ],
            //   imageIdx: 0
            // });
        
            // previewImage.present();
  
          break;
        case 'audio':
          if(file.playing){
            this.audioPlayer.stop();
          }else{
            this.audioPlayer = this.media.create(file.path);
            this.audioPlayer.onStatusUpdate.subscribe(status => {
              switch (status) {
                case 0:
                  file.playing = false;
                  break;
                case 1:
                  file.playing = true;
                  break;
                case 2:
                  file.playing = true;
                  break;
                case 3:
                  file.playing = false;
                  break;
                case 4:
                  file.playing = false;
                  break;
                default:
                  file.playing = false;
                  break;
              }
              this.cd.detectChanges();
            });
            this.audioPlayer.play();
          }
          break;
        case 'video':

          preview = await this.modalController.create({
            component: PreviewMediaComponent,
            componentProps: {
              imageIdx: 0,
              images: [
                { 
                  video_path:file.path
                }
              ]
            }
          });
          preview.present();
          // let previewVideo = this.modalController.create(ImagesPreviewModalComponent,{
          //   images: [
          //     { 
          //       video_path:file.path 
          //     }
          //   ],
          //   imageIdx: 0
          // });
      
          // previewVideo.present();
  
          break;
      
        default:
          break;
      }

  }

  downloadFile(file:any){
    file.downloading = true;
    this.fileservice.downloadFile(file.link,file.filename).then(()=>{
      file.downloading = false;
    });
  }

  openRessourcesDetails(ressource: any){
    this.navCtrl.navigateRoot(['eleve/ressources-details'],{
      queryParams:{
        id: ressource.id
      }
    });

  }

}
