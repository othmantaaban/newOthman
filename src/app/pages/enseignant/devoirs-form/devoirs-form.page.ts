import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import {
  MediaCapture,
  CaptureVideoOptions,
  CaptureAudioOptions,
} from '@awesome-cordova-plugins/media-capture';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Camera, ImageOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalInputComponent } from 'src/app/components/modal-input/modal-input.component';

@Component({
  selector: 'app-devoirs-form',
  templateUrl: './devoirs-form.page.html',
  styleUrls: ['./devoirs-form.page.scss'],
})
export class DevoirsFormPage implements OnInit {

  youtubeLink: any;
  link: string = '';

  fileArray: any;
  files: any[] = [];
  imageArr: any;

  loading: any;
  _result: any;
  _resultPage: any;
  image: any;
  file: any;
  typeDevoir: any = 'collectif';
  showElevesModal: boolean = false;
  inscriptions_selected: any[] = [];
  //@ts-ignore
  inscriptions: any[];
  //@ts-ignore
  all_inscriptions: any[];
  searchKey: any;

  content: any = {};

  curdate: any;

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public apiSerivce: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fs: FileService,
    public modalCtrl: ModalController,
    private File: File
  ) {
    if (this.route.snapshot.queryParamMap.has('content')) {
      this.content = JSON.parse(
        //@ts-ignore
        this.route.snapshot.queryParamMap.get('content')
      );
      if (this.content.files){
        for (let index = 0; index < this.content.files.length; index++) {
          const element = this.content.files[index];

          let type = 'document';

          if(!element.mime){
            type = element.link.includes('youtube')?'youtube':'link';
          }else{
            if(element.mime.type.includes('image')){
              type = 'image';
            }else if(element.mime.type.includes('video')){
              type = 'video';
            }else if(element.mime.type.includes('audio')){
              type = 'audio';
            }
          }

          this.files.push({
            name : element.filename,
            file: null,  
            type: type,
            link: element.link,
          })
          
        }
      }

    } else {
      this.content.id = null;
      this.content.type = this.route.snapshot.queryParamMap.get('type');
    }

    

    var now = new Date();
    var month: any = (now.getMonth() + 1);               
    var day: any = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    this.curdate = now.getFullYear() + '-' + month + '-' + day;

    this.content.date = this.curdate;

    this.formGroup = this.formBuilder.group({
      typeDevoir: ['', Validators.nullValidator],
      titre: ['', Validators.required],
      classes: ['', Validators.nullValidator],
      matiere: ['', Validators.nullValidator],
      image: ['', Validators.nullValidator],
      // file: ['', Validators.nullValidator],
      description: [
        '', Validators.required
      ],
      date: [
        this.curdate, Validators.required
      ],
      id: ['', Validators.nullValidator],
    });
  }

  ionViewDidLoad() {}

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      duration: 3000000,
    });
    this.loading.present();
  }

  getData(): void {
    let params = {
      op: 'prof-content',
      enseignant_id: this.authservice.enseignant,
      key: this.authservice.token,
      type: 'devoir',
      add: this.content.id ? false : true,
      content: this.content.id,
    };

    this.apiSerivce.get(params, 'prof_content').subscribe(
      (result) => {
        this._resultPage = result;
        console.log(this._resultPage);
        
        if (
          !this.content.classes &&
          this._resultPage.data.classes.length == 1
        ) {
          this.content.classes = this._resultPage.data.classes[0].id;
        }
        this.loading.dismiss();
      },
      (error) => {
        this.loading.dismiss();
        console.log('Error :: ' + error);
      }
    );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
  }
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
    });

    toast.present();
  }

  //@ts-ignore
  submit() {
    this.presentLoadingCustom();
    // this.content.file = this.fileArray;
    // this.content.image = this.imageArr;
    if (this._resultPage.data.matieres.length == 1) {
      this.content.matiere = this._resultPage.data.matieres[0].id;
    }

    if (this.typeDevoir == 'individuel') {
      if (this.inscriptions_selected.length <= 0) {
        let alert = this.alertCtrl.create({
          cssClass: 'success_alert_boti',
          header: 'Eleves Obligatoire !',
          message: 'Veuillez choisir des eleves pour le devoir individuel.',
          buttons: [
            {
              text: 'Fermer',
              role: 'cancel',
              handler: () => {},
            },
          ],
        });
        alert.then((alrt) => {
          alrt.present();
        });
        this.loading.dismiss();
        return false;
      }
    }

    let youtubes = [];
    let links = [];
    let edit_attachements = [];
    let attachements = [];

    for (let index = 0; index < this.files.length; index++) {
      const element = this.files[index];
      
      switch (element.type) {
        case 'youtube':
          youtubes.push(element.link)
          break;
        case 'link':
          links.push(element.link)
          break;
        default:
          if(element.file){
            attachements.push(element)
          }else{
            edit_attachements.push(element.name)
          }
          break;
      }
    }

    let data = {
      enseignant_id: this.authservice.enseignant,
      image: this.image,
      typeDevoir: this.typeDevoir,
      inscriptions: JSON.stringify(this.inscriptions_selected),
      content: JSON.stringify(this.content),
      "files[]": attachements,
      "edit_files[]": edit_attachements,
      "youtube[]": youtubes,
      "links[]": links,
    }

    console.log(data);

    this.apiSerivce
      .post(
        data,
        'prof_content'
      )
      .subscribe(
        (result) => {
          this.loading.dismiss();
          let res: any = result;
          this.alertCtrl
            .create({
              cssClass: 'success_alert_boti',
              header: res.title,
              message: res.message,
              buttons: [
                {
                  text: 'Fermer',
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.navigateRoot(['/enseignant']).then(() => {
                      this.navCtrl.navigateRoot(['/enseignant/devoirs'], {
                        queryParams: { type: this.content.type },
                      });
                    });
                  },
                },
              ],
            })
            .then((alert) => {
              alert.present();
            });
        },
        (error) => {
          this.loading.dismiss();
        }
      );
  }

  //@ts-ignore
  uploadFile(
    event: any,
    img: any = false,
    isEdit: any = false,
    fileBlob: any = null
  ) {
    if (!isEdit && event.target.length === 0) {
      return null;
    }

    // console.log(fileBlob);

    const mimType = isEdit ? fileBlob.type : event.target.files[0].type;
    if (img && mimType.match(/image\/*/) == null) {
      return;
    }

    const file = isEdit ? fileBlob : event.target.files[0];
    const filename = file.name;
    const extension = file.name.slice(file.name.lastIndexOf('.') + 1);

    
    this.files.unshift({
      name : filename,
      file: file,  
      type: 'document',  
    });

    //@ts-ignore
    // this.toBase64(file).then((res: string) => {
    //   // console.log(res);
    //   if (img) {
    //     this.imageArr = {
    //       name: filename,
    //       extention: extension,
    //       base64Img: res,
    //     };
    //     if (
    //       this._resultPage &&
    //       this._resultPage.translation &&
    //       this._resultPage.translation.image_choosed
    //     )
    //       this.presentToast(this._resultPage.translation.image_choosed);
    //     // this.presentToast("Image choisi avec succès");
    //   } else {
    //     this.fileArray = {
    //       name: filename,
    //       extention: extension,
    //       base64File: res,
    //     };
    //     if (
    //       this._resultPage &&
    //       this._resultPage.translation &&
    //       this._resultPage.translation.file_choosed
    //     )
    //       this.presentToast(this._resultPage.translation.file_choosed);
    //     // this.presentToast("Fichier choisi avec succès");
    //   }
    // });
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = this.getFileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)[
      '__zone_symbol__originalInstance'
    ];
    return zoneOriginalInstance || fileReader;
  }

  async getFileFromUrl(url: any) {
    return new Promise(async (resolve) => {
      let base64: any = this.fs.base64FromPath(url);
      resolve(this.fs.base64toBlob(base64));
      // this.apiSerivce.getFile(url,true).subscribe((res)=>{
      //   resolve(res);
      // });
    });
  }

  async presentToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    });

    toast.present();
  }

  toggleElevesModal(save = false) {
    if (!this.showElevesModal && this.content && this.content.classes) {
      console.log('fetched classes', this.content.classes);
      let params = {
        op: 'getInscription',
        enseignant_id: this.authservice.enseignant,
        classes: this.content.classes,
      };

      this.apiSerivce.get(params, 'prof_content').subscribe((result: any) => {
        this.all_inscriptions = result.inscriptions;
        this.inscriptions = this.all_inscriptions;
        this.searchKey = null;
        console.log(this.inscriptions);
      });
    }

    console.log(`modal content`, this.content);
    console.log(
      `modal conditions`,
      this._resultPage,
      this.typeDevoir,
      this.inscriptions,
      this.showElevesModal
    );
    this.showElevesModal = !this.showElevesModal ? true : false;
  }

  search_key(ev: any) {
    // this.searchKey = ev.value;
    this.search();
  }

  search() {
    this.inscriptions = this.all_inscriptions.filter((item) =>
      Object.keys(item).some(
        (k) =>
          k == 'nom' &&
          item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(this.searchKey.toLowerCase())
      )
    );
  }

  selectInscription(inscription: any) {
    let index = -1;
    this.inscriptions_selected.map((inscri, idx) => {
      if (inscri.id == inscription.id) index = idx;
    });

    if (index >= 0) {
      this.inscriptions_selected.splice(index, 1);
    } else {
      this.inscriptions_selected.push(inscription);
    }
  }

  isSelected(inscription: any) {
    let index = false;
    this.inscriptions_selected.map((inscri, idx) => {
      if (inscri.id == inscription.id) index = true;
    });
    return index;
  }

  async recordAudio() {
    let options: CaptureAudioOptions = { limit: 1 };
    console.log(options);
    let data: any = await MediaCapture.captureAudio(options);
    console.log(data);
    let filePath = data[0].fullPath.replace('/private/', '/');
    if (!filePath.includes('file://')) {
      filePath = 'file://' + filePath;
    }
    const type = data[0].type;
    console.log(filePath);
    try {
      const directory = await this.File.resolveDirectoryUrl(
        filePath.replace(data[0].name.replace(' ', '%20'), '')
      );
      console.log(directory);
      const file = await this.File.getFile(directory, data[0].name, {
        create: false,
      });

      let fileBlob = await this.makeFileIntoBlob(file, type);
      const filename = data[0].name;

      console.log('file type ', type);
      // if (fileBlob && type.match(/image\/*/) == null) {
      //   return;
      // }
      console.log('file blob ', fileBlob);

      const extension = filename.slice(filename.lastIndexOf('.') + 1);

      this.files.unshift({
        name : filename,
        file: fileBlob,
        type: 'audio'  
    });

    } catch (error) {
      console.log(error);
    }
  }

  
  async captureImage() {
    let options: ImageOptions = {
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    };
    let photo = await Camera.getPhoto(options);
    // this.addImagePlaceholder();
    let type = 'image/jpeg';

    if (photo.format == 'png') {
      type = 'image/png';
    }

    let filename = photo.webPath?.split('/').pop()||('photo.'+photo.format);

    let fileBlob = await this.fs.base64toBlob(
      photo.base64String as string,
      type
    );

    this.files.unshift({
      name : filename,
      file: fileBlob,
      type: 'image'
    });

    console.log(this.files);
  }
  
  async captureVideo() {
    let options: CaptureVideoOptions = { limit: 1, quality: 100 };
    let data: any = await MediaCapture.captureVideo(options);
    console.log(data);
    try {
      let filePath = data[0].fullPath.replace('/private/', '/');
      if (!filePath.includes('file://')) {
        filePath = 'file://' + filePath;
      }
      
      const filename = data[0].name;

      const type = data[0].type;
      console.log(filePath);
      const directory = await this.File.resolveDirectoryUrl(
        filePath.replace(data[0].name, '')
      );
      console.log(directory);
      const file = await this.File.getFile(directory, data[0].name, {
        create: false,
      });
      console.log(file);

      let fileBlob = await this.makeFileIntoBlob(file, type);

      this.files.unshift({
        name : filename,
        file: fileBlob,
        type: 'video'
      });

    } catch (error) {
      console.log(error);
    }

  }

  async makeFileIntoBlob(fileEntry: any, type: any): Promise<any> {
    let { name, nativeURL } = fileEntry;

    // get the path..
    let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));

    // let fileName = name;
    console.log(`promise file entry`, fileEntry);
    try {
      const WrappedFileReader = window.FileReader;
      // @ts-ignore
      window.FileReader = function OriginalFileReader(...args) {
        // @ts-ignore
        WrappedFileReader.apply(this, args);
        // @ts-ignore
        const originalInstance = this[Zone.__symbol__('originalInstance')]; // eslint-disable-line

        return originalInstance || this;
      };
      let buffer = await this.File.readAsArrayBuffer(path, name);
      console.log(`promise file buffer`, buffer);
      // we are provided the name, so now read the file into
      // a buffer
      // get the buffer and make a blob to be saved
      let fileBlob = new Blob([buffer], {
        type: type,
      });

      return fileBlob;
    } catch (error) {
      console.error(`promise file buffer ERROR`, error);
    }
  }

  
  async showModalInput(valueOf: string){
    const modal = await this.modalCtrl.create({
      component: ModalInputComponent,
      componentProps:{
        valueOf: valueOf
      }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(!data){
      return false;
    }
    
    return this.files.unshift({
      name : data,
      file: null,
      type: valueOf,
      link: data
    });
  }

}
