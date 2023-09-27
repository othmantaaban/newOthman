import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file/ngx';
import {
  CaptureError,
  CaptureImageOptions,
  CaptureVideoOptions,
  MediaCapture,
} from '@awesome-cordova-plugins/media-capture';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { PreviewMediaComponent } from 'src/app/components/preview-media/preview-media.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Camera, ImageOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { forkJoin } from 'rxjs';
import { FileService } from 'src/app/services/file.service';
// import { range } from "lodash";
const _ = require('lodash');
@Component({
  selector: 'app-album-photo-form',
  templateUrl: './album-photo-form.page.html',
  styleUrls: ['./album-photo-form.page.scss'],
})
export class AlbumPhotoFormPage implements OnInit {
  //@ts-ignore
  imageArr: { extention: any; base64Img: string };
  placeholders: any = [];
  galleryImages: any = [];

  showElevesModal: boolean = false;
  _result: any;
  loading: any;

  searchKey: any;
  all_inscriptions: any = [];
  inscriptions: any = [];
  inscriptions_selected: any = [];
  currentImage: any;

  album: any = {};

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public authservice: AuthService,
    // private base64: Base64,
    private _ngZone: NgZone,
    // private camera: Camera,
    // private cropService: Crop,
    // private imagePicker: ImagePicker,
    private plt: Platform,
    private file: File,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public cd: ChangeDetectorRef,
    private modalController: ModalController,
    private fileservice: FileService
  ) {
    if (this.route.snapshot.queryParamMap.get('id'))
      this.album.id = this.route.snapshot.queryParamMap.get('id');
    else {
      this.album.id = null;
    }

    this.album.classes = [];
    this.album.images = [];
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
          form: true,
          id: this.album.id,
        },
        'prof_album_photo'
      )
      .subscribe(
        (result) => {
          console.log(result);
          
          this._result = result;
          this.inscriptions = this._result.data.inscriptions;
          this.all_inscriptions = this.inscriptions;
          if (this._result.album) {
            this.album = this._result.album;
          } else {
            this.album.classes = this._result.data.classes.map(
              (val: any) => val.id
            );
          }
          return this.loading.dismiss();
        },
        (error) => console.log('Erreur :: ' + error)
      );
  }

  ngOnInit(): void {
    this.presentLoadingCustom().then(() => {
      this.getData();
    });
  }

  async pageContents() {
    if (this.album.images.length == 0) {
      const confirm = await this.alertCtrl.create({
        cssClass: 'success_alert_boti',
        header: this._result.translation.title_garder_album,
        message: this._result.translation.qst_garder_album,
        buttons: [
          {
            text: this._result.translation.button_garder,
            handler: () => {
              this.deleteAlbum();
            },
          },
          {
            text: this._result.translation.button_supprimer,
            handler: () => {
              this.navCtrl.navigateRoot(['/enseignant/planning']).then(() => {
                this.navCtrl.navigateForward(['/enseignant/album-photo']);
              });
            },
          },
        ],
      });
      confirm.present();
    } else {
      this.navCtrl.navigateRoot(['/enseignant/planning']).then(() => {
        this.navCtrl.navigateForward(['/enseignant/album-photo']);
      });
    }
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();
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

  selectClasse(classe: any) {
    let index = this.album.classes.indexOf(Number(classe.id));
    if (index != -1) {
      this.album.classes.splice(index, 1);
    } else {
      this.album.classes.push(Number(classe.id));
    }
    this.all_inscriptions = this._result.data.inscriptions.filter(
      (c: any) => this.album.classes.indexOf(Number(c.classe_id)) != -1
    );
    this.inscriptions = this.all_inscriptions;
  }

  // convertToBase64(imageUrl:any, isImage:any) {
  //   this.base64.encodeFile(imageUrl).then(
  //     (base64Fichier: string) => {
  //       let imagesArr = [];
  //       let imageArr = {
  //         extention: imageUrl.split(".").pop(),
  //         base64Img: base64Fichier.split(",").pop(), //same comment for image follows here.
  //       };
  //       imagesArr.push(imageArr);

  //       this.submit(false, imagesArr)
  //         .then(() => {
  //           this.removePlaceholder();
  //           return this.cd.detectChanges();
  //         })
  //         .catch((err) =>
  //           console.log("console convert 1", "sendgallery(submit):" + err)
  //         );

  //       return imagesArr;
  //     },
  //     (err) => {
  //       return console.log("console convert 2", "converttobase(encode):" + err);
  //     }
  //   );
  // }

  async presentToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    });

    // toast.onDidDismiss(() => {});

    toast.present();
  }

  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: this._result.translation.actions_title,
      buttons: [
        {
          text: this._result.translation.vid,
          handler: () => {
            this.openGalleryVideo();
          },
        },
        {
          text: this._result.translation.pic,
          handler: () => {
            this.openGalleryPhoto();
          },
        },
        {
          text: this._result.translation.take_pic,
          handler: () => {
            this.captureImage();
          },
        },
        {
          text: this._result.translation.take_vid,
          handler: () => {
            this.captureVideo();
          },
        },
      ],
    });
    actionSheet.present();
  }

  async captureVideo() {
    let options: CaptureVideoOptions = { limit: 1, quality: 100 };
    let data: any = await MediaCapture.captureVideo(options);
    this.addImagePlaceholder();
    console.log(data);
    try {
      let filePath = data[0].fullPath.replace('/private/', '/');
      if (!filePath.includes('file://')) {
        filePath = 'file://' + filePath;
      }
      const type = data[0].type;
      console.log(filePath);
      const directory = await this.file.resolveDirectoryUrl(
        filePath.replace(data[0].name, '')
      );
      console.log(directory);
      const file = await this.file.getFile(directory, data[0].name, {
        create: false,
      });
      console.log(file);

      let fileBlob = await this.makeFileIntoBlob(file, type);
      this.apiSerivce
        .post(
          {
            enseignant_id: this.authservice.enseignant,
            key: this.authservice.token,
            album: JSON.stringify(this.album),
            video: '1',
            file: {
              file: fileBlob,
              name: data[0].name,
            },
          },
          'prof_album_photo_add'
        )
        .subscribe((res) => {
          if (res.album.images) {
            this.album.images = res.album.images;
          }
          if (res.images) {
            this.removePlaceholder();
            for (const elem of res.images) {
              this._ngZone.run(() => {
                this.album.images.push(elem);
              });
            }
            // for (var i = 0; i < images.length; i++) {
            //   this.album.images.push(res.images[i]);
            // }
          }
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
    this.addImagePlaceholder();
    let type = 'image/jpeg';

    if (photo.format == 'png') {
      type = 'image/png';
    }

    let fileBlob = await this.fileservice.base64toBlob(
      photo.base64String as string,
      type
    );

    this.apiSerivce.post(
      {
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
        album: JSON.stringify(this.album),
        file: {
          file: fileBlob,
          name: `image.${photo.format}`,
        },
      },
      'prof_album_photo_add'
    ).subscribe((result) => {
      if (result.images) {
        this.removePlaceholder();
        for (const elem of result.images) {
          this._ngZone.run(() => {
            this.album.images.push(elem);
          });
        }
      }
    })
    console.log(photo);
  }

  async makeFileIntoBlob(fileEntry: any, type: any): Promise<any> {
    let { name, nativeURL } = fileEntry;

    // get the path..
    let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));

    // let fileName = name;
    console.log(`promise file entry`, fileEntry);
    try {
      const WrappedFileReader = window.FileReader
      // @ts-ignore
      window.FileReader = function OriginalFileReader(...args) {
        // @ts-ignore
        WrappedFileReader.apply(this, args)
        // @ts-ignore
        const originalInstance = this[Zone.__symbol__('originalInstance')] // eslint-disable-line

        return originalInstance || this
      }
      let buffer = await this.file.readAsArrayBuffer(path, name);
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

  getFileFromEntry(fileEntry: any): Promise<any> {
    return new Promise((resolve, reject) => {
      fileEntry.file(
        (file: any) => resolve(file),
        (error: any) => reject(error)
      );
    });
  }

  async openGalleryPhoto() {
    let result = await FilePicker.pickImages({
      multiple: true,
      readData: true,
    });

    let fileimages = result.files;

    console.log(`result img : `, fileimages);
    console.log(`result img lenght: `, fileimages.length);

    this.addImagePlaceholder(fileimages.length);

    let imgRequests = [];
    for (let index = 0; index < fileimages.length; index++) {
      console.log(`result img itm : `, fileimages[index]);
      console.log('File :', fileimages[index]);
      let fileBlob = await this.fileservice.base64toBlob(
        fileimages[index].data as string,
        fileimages[index].mimeType
      );
      imgRequests.push(
        this.apiSerivce.post(
          {
            enseignant_id: this.authservice.enseignant,
            key: this.authservice.token,
            album: JSON.stringify(this.album),
            file: {
              file: fileBlob,
              name: fileimages[index].name,
            },
          },
          'prof_album_photo_add'
        )
      );
    }
    console.log('Img Requests', imgRequests);
    forkJoin(imgRequests).subscribe((results) => {
      console.log(results);
      results.forEach((element: any) => {
        if (element.album.images) {
          this.album.images = element.album.images;
        }
        if (element.images) {
          this.removePlaceholder();
          for (const elem of element.images) {
            this.album.images.push(elem);
          }
        }
      });
    });

  }

  async openGalleryVideo() {
    let result = await FilePicker.pickVideos({
      multiple: true,
      readData: true,
    });

    let fileimages = result.files;

    console.log(`result vid : `, fileimages);
    console.log(`result vid lenght: `, fileimages.length);

    this.addImagePlaceholder(fileimages.length);

    let imgRequests = [];
    for (let index = 0; index < fileimages.length; index++) {
      console.log(`result vid itm : `, fileimages[index]);

      let fileBlob = await this.fileservice.base64toBlob(
        fileimages[index].data as string,
        fileimages[index].mimeType
      );
      imgRequests.push(
        this.apiSerivce.post(
          {
            enseignant_id: this.authservice.enseignant,
            key: this.authservice.token,
            album: JSON.stringify(this.album),
            video: '1',
            file: {
              file: fileBlob,
              name: fileimages[index].name,
            },
          },
          'prof_album_photo_add'
        )
      );
    }

    console.log('Img Requests', imgRequests);
    forkJoin(imgRequests).subscribe((results) => {
      console.log(results);
      results.forEach((element: any) => {
        if (element.album.images) {
          this.album.images = element.album.images;
        }
        if (element.images) {
          this.removePlaceholder();
          for (const elem of element.images) {
            this._ngZone.run(() => {
              this.album.images.push(elem);
            });
          }
        }
      });
    });
  }

  async uploadResults(results: any) {
    return new Promise((resolve, reject) => {
      Promise.all(
        results.map(async (element: any) => {
          await this.file
            .resolveLocalFilesystemUrl(element)
            .then(async (fileEntry) => {
              await fileEntry.getMetadata(async (metadata) => {
                if (metadata.size > 2097152) {
                  if (!this.plt.is('android')) {
                    let res_element = await this.getUploadableImageIOS(element);

                    let res = await this.getImageBase64(res_element);
                    let array = [];
                    array.push(res);

                    this.submit(false, array)
                      .then(async (result) => {
                        resolve('submit result');
                      })
                      .catch((err) => alert('sendgallery(submit):' + err));
                  } else {
                    let compressedimage = this.getUploadableImage(element);
                    await this.getImageBase64(compressedimage)
                      .then(async (res) => {
                        this.submit(false, res)
                          .then(async (result) => {
                            resolve('submit result');
                          })
                          .catch((err) => alert('sendgallery(submit):' + err));
                      })
                      .catch((err) => { });
                  }
                } else {
                  if (!this.plt.is('android')) {
                    await this.getImageBase64(element)
                      .then(async (res) => {
                        let array = [];
                        array.push(res);
                        this.submit(false, array)
                          .then(async (result) => {
                            resolve('submit result');
                          })
                          .catch((err) =>
                            console.log(
                              'console 8',
                              'sendgallery(submit):' + err
                            )
                          );
                      })
                      .catch((err) => { });
                  } else {
                    await this.getImageBase64(element)
                      .then(async (res) => {
                        let array = [];
                        array.push(res);
                        this.submit(false, array)
                          .then(async (result) => {
                            resolve('submit result');
                          })
                          .catch((err) =>
                            console.log(
                              'console 8',
                              'sendgallery(submit):' + err
                            )
                          );
                      })
                      .catch((err) => { });
                  }
                  // sent =  this.convertToBase64(element, true);
                }
              });
            });
        })
      );
    });
  }

  submit(share: any = false, images: any) {
    return new Promise((resolve, reject) => {
      let query: any = {
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
        album: JSON.stringify(this.album),
      };

      if (!share) {
        query.images = JSON.stringify(images);
      }

      this.apiSerivce.post(query, 'prof_album_photo').subscribe(
        (result) => {
          let res: any = result;
          this.album.id = res.album.id;
          this.album.label = res.album.label;

          if (res.album.images) {
            this.album.images = res.album.images;
          }
          if (res.images) {
            this.removePlaceholder();
            for (const elem of res.images) {
              this._ngZone.run(() => {
                this.album.images.push(elem);
              });
            }
            // for (var i = 0; i < images.length; i++) {
            //   this.album.images.push(res.images[i]);
            // }
          }

          if (share) {
            this.navCtrl.navigateRoot(['/enseignant/planning']).then(() => {
              this.navCtrl.navigateForward(['/enseignant/album-photo']);
            });
          }
          return resolve('submit result');
        },
        (error) => {
          // loadingWait.dismiss();
          return reject(error);
        }
      );
    });
  }

  toggleElevesModal(image = null, save = false, ev: any) {
    if (ev) ev.stopPropagation();
    if (image) {
      this.currentImage = image;
      this.inscriptions_selected = this.currentImage.inscriptions_id;
    }
    this.showElevesModal = !this.showElevesModal ? true : false;
    if (save) {
      let query = {
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
        image_id: this.currentImage.id,
        inscriptions: JSON.stringify(this.inscriptions_selected),
      };

      this.apiSerivce.post(query, 'prof_album_photo').subscribe(
        (result) => {
          let res: any = result;
          if (res.image) {
            let index = this.album.images.findIndex(
              (x: any) => x.id === this.currentImage.id
            );
            this.album.images[index] = res.image;

            this.currentImage = null;
            this.inscriptions_selected = [];
            this.inscriptions = this.all_inscriptions;
          }
        },
        (error) => {
          this.loading.dismiss();
        }
      );
    }
  }

  async deleteImage(image: any, ev: any) {
    if (ev) ev.stopPropagation();
    let alert = await this.alertCtrl.create({
      cssClass: 'success_alert_boti',
      header: this._result.translation.title_sup,
      message: this._result.translation.msg_sup,
      buttons: [
        {
          text: this._result.translation.button_supprimer,
          handler: () => {
            let query = {
              enseignant_id: this.authservice.enseignant,
              key: this.authservice.token,
              image_id: image.id,
              delete_image: true,
            };
            // "enseignant_id=" +
            // ApiService.enseignantId +
            // "&key=" +
            // ApiService.keyToken +
            // "&image_id=" +
            // image.id +
            // "&delete_image=true";

            this.apiSerivce.post(query, 'prof_album_photo').subscribe(
              (result) => {
                // let res: any = result;

                let index = this.album.images.findIndex(
                  (x: any) => x.id === image.id
                );
                this.album.images.splice(index, 1);
              },
              (error) => {
                this.loading.dismiss();
              }
            );
          },
        },
      ],
    });
    alert.present();
  }

  search_key(ev: any) {
    // this.searchKey = ev.value;
    console.log(ev);
    this.search();
  }

  search() {
    this.inscriptions = this.all_inscriptions.filter((item: any) =>
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
    let index = this.inscriptions_selected
      ? this.inscriptions_selected.indexOf(inscription.id)
      : -1;
    if (index >= 0) {
      this.inscriptions_selected.splice(index, 1);
    } else {
      this.inscriptions_selected.push(inscription.id);
    }
  }



  log(message: any) {
    console.log(message);
  }

  goAlbumPhoto() {
    this.navCtrl.navigateRoot(['/enseignant/planning']).then(() => {
      this.navCtrl.navigateForward(['/enseignant/album-photo']);
    });
  }

  async deleteAlbum() {
    let alert = await this.alertCtrl.create({
      cssClass: 'success_alert_boti',
      header: this._result.translation.title_delete_album,
      message: this._result.translation.qst_delete_album,
      buttons: [
        {
          text: this._result.translation.button_supprimer,
          handler: () => {
            this.presentLoadingCustom();
            let query = {
              enseignant_id: this.authservice.enseignant,
              key: this.authservice.token,
              delete_album: this.album.id,
            };
            // "enseignant_id=" +
            // ApiService.enseignantId +
            // "&key=" +
            // ApiService.keyToken +
            // "&delete_album=" +
            // this.album.id;
            this.apiSerivce.post(query, 'prof_album_photo').subscribe(
              async (result) => {
                let res: any = result;
                this.loading.dismiss();
                let alert = await this.alertCtrl.create({
                  cssClass: 'success_alert_boti',
                  header: res.title,
                  message: res.message,
                  buttons: [
                    {
                      text: 'Fermer',
                      role: 'cancel',
                      handler: () => {
                        this.loading.dismiss();
                        this.goAlbumPhoto();
                      },
                    },
                  ],
                });
                alert.present();
              },
              (error) => {
                this.loading.dismiss();
              }
            );
          },
        },
      ],
    });

    alert.present();
  }

  addImagePlaceholder(count = 1) {
    this._ngZone.run(() => {
      this.placeholders = _.range(1, count + 1);
    });
  }

  async removePlaceholder(count = 1) {
    this._ngZone.run(() => {
      for (let index = 0; index < count; index++) {
        this.placeholders.pop();
      }
    });
  }

  getUploadableImage(image: any) {
    // this.cropService.crop(image, { quality: 75 }).then(
    //   (newImage) => {
    //     this.file.resolveLocalFilesystemUrl(newImage).then((fileEntry) => {
    //       fileEntry.getMetadata((metadata) => {
    //         if (metadata.size > 2097152) {
    //           this.getUploadableImage(newImage);
    //         } else {
    //           return newImage;
    //         }
    //       });
    //     });
    //   },
    //   (error) => console.error("Error cropping image", error)
    // );
    return image;
  }

  getUploadableImageIOS(image: any) {
    return image;
    // return new Promise((resolve, reject) => {
    //   this.cropService.crop(image, { quality: 10, targetWidth: 1000 }).then(
    //     (newImage) => {
    //       return resolve(newImage);
    //     },
    //     (error) => console.error("Error cropping image", error)
    //   );
    // });
  }

  getImageBase64(imageUrl: any) {
    return new Promise(async (resolve, reject) => {
      console.log('imageUrl_', imageUrl);
      var copyPath = imageUrl;
      var splitPath = copyPath.split('/');
      var imageName = splitPath[splitPath.length - 1];
      var filePath = imageUrl.split(imageName)[0];
      var image;
      await this.file.readAsDataURL(filePath, imageName).then(
        (base64) => {
          let imageArr = {
            extention: imageUrl.split('.').pop(),
            base64Img: base64, //same comment for image follows here.
          };

          image = imageArr;

          return resolve(image);
        },
        (error) => { }
      );

      return resolve(image);
    });
  }
  // getImageBase64(imageUrl:any) {
  //   return new Promise(async (resolve, reject) => {
  //     var image;
  //     await this.base64.encodeFile(imageUrl).then(
  //       (base64Fichier: string) => {
  //         let imageArr = {
  //           extention: imageUrl.split(".").pop(),
  //           base64Img: base64Fichier.split(",").pop(), //same comment for image follows here.
  //         };

  //         console.log("imageArr_", imageArr);

  //         image = imageArr;

  //         return resolve(image);
  //       },
  //       (err) => {
  //         reject("getImageBase64(encode):" + JSON.stringify(err));
  //       }
  //     );

  //     return resolve(image);
  //   });
  // }

  async previewImages(index = 0, event: any) {
    if (event) event.stopPropagation();
    let preview = await this.modalController.create({
      component: PreviewMediaComponent,
      componentProps: {
        imageIdx: index,
        images: this.album.images,
      },
    });

    preview.present();
  }
}
