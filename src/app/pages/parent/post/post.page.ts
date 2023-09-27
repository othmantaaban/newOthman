import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { PreviewMediaComponent } from 'src/app/components/preview-media/preview-media.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ParentService } from 'src/app/services/parent.service';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  // @ts-ignore: Unreachable code error
  // @ViewChild(IonModal) previewModal: IonModal;

  // @ts-ignore: Unreachable code error
  audioPlayer: MediaObject;

  result:any;
  _result:any;
  _resultQuiz:any;
  description:any;
  eleve:any;
  // fileTransfer: FileTransferObject = this.transfer.create();
  public commentaire	: any;
  // @ts-ignore: Unreachable code error
  public formGroup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public apiSerivce: ApiService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private parentController: ParentService,
    private authController: AuthService,
    private route: ActivatedRoute,
    private media: Media,
    private fs: FileService,
    private cd: ChangeDetectorRef
    ) {
     // moment.locale('fr');
     this.eleve = this.parentController.currentEleve;
     this.result = this.route.snapshot.queryParamMap.get('result');

     console.log(this.result)
     
     if(this.result)
     this.result = JSON.parse(this.result);

     console.log(this.result)
     this.description = this.getInnerHTMLValue();
     this.formGroup = this.formBuilder.group({
       commentaire: ['', Validators.required],
     });
  }

  async presentSuccess(header: string,message: string){
    const alertSuccess = await this.alertCtrl.create({
      header: header,
      message: message,
      cssClass: 'success_alert_boti',
      buttons: ['Ok']
    });

    alertSuccess.present();
  }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id: this.authController.user,
        parent_id: this.parentController.parentId,
        eleve_id: this.parentController.currentEleve.id,
        key: this.authController.token,
        post: this.result.id
      }, 'post_view')
      .subscribe(
        result => {
          this._result = result;
          this.result.files = result.data.post.files;
          console.log('res files',this.result.files);
          
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
  }

  getInnerHTMLValue() {
    return this.sanitizer.bypassSecurityTrustHtml(this.result.description);
  }

  ionViewDidLoad() {
  }

  downloadFile(file: any) {
    this.fs.downloadFile(file.link,file.text)
    // this.ft.downloadFile(file.text, file.link);
  }

  downloadImage(image: any) {
    this.fs.downloadImage((image.video_path) ? image.video_path : image.image_path,image.photo)
    // this.ft.downloadFile(image.photo, (image.video_path) ? image.video_path : image.image_path);
  }

  send() {
    // let query = "commentaire=" + this.commentaire +
    //   "&eleve_id=" + this.parentController.currentEleve.id +
    //   "&user_id=" + this.authController.user + "&parent_id=" + this.parentController.parentId +
    //   "&key=" + this.authController.token
    //   ;

    // query += "&post=" + this.result.id;

      this.apiSerivce.post({
        commentaire: this.commentaire,
        eleve_id: this.parentController.currentEleve.id ,
        user_id: this.authController.user ,
        parent_id: this.parentController.parentId ,
        key: this.authController.token,
        post: this.result.id,
      }, 'nouveautes').subscribe(
        result => {
          // this.navCtrl.setRoot(PostPage, { result: this.result });
          this._result.data.commentaires.push(result.commentaire)
          this.commentaire = null
        },
        error => {

          //alert(error);
          console.log("Error :: " + error);
          //this.loading.dismiss().catch();
        }
      );
  }

  send_quiz(reponse: any) {
    let query = "quiz=" + reponse +
      "&eleve_id=" + this.parentController.currentEleve.id +
      "&user_id=" + this.authController.user + "&parent_id=" + this.parentController.parentId +
      "&key=" + this.authController.token
      ;

    query += "&post=" + this.result.id;

      this.apiSerivce.post(query, 'nouveautes').subscribe(
        async (result) => {

          this._resultQuiz = result;
          this.result.quizDone = this._resultQuiz.quizDone;
          this.result.permitQuiz = false;
          const alertSuccess = await this.alertCtrl.create({
            header: 'Merci !',
            message: this._resultQuiz.message,
            cssClass: 'success_alert_boti',
            buttons: ['Ok']
          });

          alertSuccess.present();

        },
        error => {

          //alert(error);
          console.log("Error :: " + error);
          //this.loading.dismiss().catch();
        }
      );
  }

  async previewImages(index = 0, event:any) {
    if (this._result.data.images.length > 0) {
      event.stopPropagation();
      let preview = await this.modalController.create({
        component: PreviewMediaComponent,
        componentProps: {
          imageIdx: index,
          images: this._result.data.images
        }
      });
      // PreviewMediaComponent, {
      //   imageIdx: index,
      //   images: this._result.data.images
      // }
      preview.present();
    }
  }

  send_rep_quiz(question: any, res: any,index: any) {
    if (question.permitAnswer) {
      let query ={
        alias_question: question.alias,
        res: res,
        eleve_id: this.parentController.currentEleve.id,
        user_id: this.authController.user,
        parent_id: this.parentController.parentId ,
        key: this.authController.token,
        post: this.result.id
      }

      

      console.log(query);
      this.apiSerivce.post(query, "nouveautes").subscribe(
        (result) => {
          question.res = res;
          let answered = this.result.quiz.filter((quest:any)=>(quest.res));
          if(answered.length == this.result.quiz.length){

            this.presentSuccess((this._result?.translation?.quiz_alert_title||'Merci !'), (this._result?.translation?.quiz_alert_body||`Vos réponses sont bien enregistrées`))
          }
        },
        (error) => {
          //alert(error);
          console.log("Error :: " + error);
          //this.loading.dismiss().catch();
        }
      );
    }
  }


  async preview(file: any) {
    console.log(file)
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
          break;
      
        default:
          break;
      }

  }

}
