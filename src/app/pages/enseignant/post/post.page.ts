import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { PreviewMediaComponent } from 'src/app/components/preview-media/preview-media.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  // @ts-ignore: Unreachable code error
  // @ViewChild(IonModal) previewModal: IonModal;

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
    private authController: AuthService,
    private route: ActivatedRoute,
    private fs: FileService
  ) {
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
        enseignant_id: this.authController.enseignant,
        key: this.authController.token,
        post: this.result.id
      }, 'post_view')
      .subscribe(
        result => {
          this._result = result;
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

  // send() {
  //   let query = "commentaire=" + this.commentaire +
  //     "&eleve_id=" + this.parentController.currentEleve.id +
  //     "&user_id=" + this.authController.user + "&parent_id=" + this.parentController.parentId +
  //     "&key=" + this.authController.token
  //     ;

  //   query += "&post=" + this.result.id;

  //     this.apiSerivce.post(query, 'nouveautes').subscribe(
  //       result => {
  //         // this.navCtrl.setRoot(PostPage, { result: this.result });
  //       },
  //       error => {

  //         //alert(error);
  //         console.log("Error :: " + error);
  //         //this.loading.dismiss().catch();
  //       }
  //     );
  // }

  // send_quiz(reponse: any) {
  //   let query = "quiz=" + reponse +
  //     "&eleve_id=" + this.parentController.currentEleve.id +
  //     "&user_id=" + this.authController.user + "&parent_id=" + this.parentController.parentId +
  //     "&key=" + this.authController.token
  //     ;

  //   query += "&post=" + this.result.id;

  //     this.apiSerivce.post(query, 'nouveautes').subscribe(
  //       async (result) => {

  //         this._resultQuiz = result;
  //         this.result.quizDone = this._resultQuiz.quizDone;
  //         this.result.permitQuiz = false;
  //         const alertSuccess = await this.alertCtrl.create({
  //           header: 'Merci !',
  //           message: this._resultQuiz.message,
  //           cssClass: 'success_alert_boti',
  //           buttons: ['Ok']
  //         });

  //         alertSuccess.present();

  //       },
  //       error => {

  //         //alert(error);
  //         console.log("Error :: " + error);
  //         //this.loading.dismiss().catch();
  //       }
  //     );
  // }

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

  // send_rep_quiz(question: any, res: any) {
  //   if (question.permitAnswer) {
  //     let query ={
  //       alias_question: question.alias,
  //       res: res,
  //       eleve_id: this.parentController.currentEleve.id,
  //       user_id: this.authController.user,
  //       parent_id: this.parentController.parentId ,
  //       key: this.authController.token,
  //       post: this.result.id
  //     }

      

  //     console.log(query);
  //     this.apiSerivce.post(query, "nouveautes").subscribe(
  //       (result) => {
  //         question.res = res;
  //         this.presentSuccess('Merci !', `Votre réponse <b>${res}</b> a bien été enregistrée.`)
  //       },
  //       (error) => {
  //         //alert(error);
  //         console.log("Error :: " + error);
  //         //this.loading.dismiss().catch();
  //       }
  //     );
  //   }
  // }

}
