import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding, WriteFileOptions } from '@capacitor/filesystem';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { apiUrl, schoolName } from 'src/environments/environment';
import { Media, MediaAlbum } from '@capacitor-community/media'
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private apiservice: ApiService,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {

  }

  async downloadImage(path: string, name: any): Promise<void> {

    let permission = await Filesystem.checkPermissions();

    if (permission.publicStorage !== 'granted')
      permission = await Filesystem.requestPermissions();


    if (permission.publicStorage == 'granted') {
      if (!name) {
        name = path.split('/').pop();
      }

      let data = await this.base64FromPath(path);
      let params: WriteFileOptions = {
        path: name,
        data: data,
        directory: Directory.Cache,
        recursive: true
      };
      let file = await Filesystem.writeFile(params);

      let albums : MediaAlbum[] = (await Media.getAlbums()).albums.filter(album=> (album.name == schoolName));
      let album : MediaAlbum;

      if(albums.length == 0){
        await Media.createAlbum({name:schoolName});
        albums = (await Media.getAlbums()).albums.filter(album=> (album.name == schoolName));
        album = albums[0];
      }else{
        album = albums[0];
      }
      

      await Media.savePhoto({ path: file.uri , albumIdentifier: album.identifier })
      this.alertCtrl.create({
        cssClass: "success_alert_boti",
        header: 'Photo téléchargée !',
        message: "",
        buttons: [
          {
            text: 'OK',
            role: "cancel",
            handler: () => { },
          },
        ],
      }).then((alert) => {
        alert.present();
      });


    }
  };

  async downloadFile(path: string, name: any) {

    let permission = await Filesystem.checkPermissions();

    if (permission.publicStorage !== 'granted')
      permission = await Filesystem.requestPermissions();

    if (permission.publicStorage == 'granted') {
      if (!name) {
        name = path.split('/').pop();
      }

      let data = await this.base64FromPath(path);
      let params: WriteFileOptions = {
        path: name,
        data: data,
        directory: Directory.Documents,
        recursive: true
      };
      await Filesystem.writeFile(params);

      let alert = await this.alertCtrl.create({
        cssClass: "success_alert_boti",
        header: 'Fichier téléchargé !',
        message: "",
        buttons: [
          {
            text: 'OK',
            role: "cancel",
            handler: () => { },
          },
        ],
      });
      alert.present();
    }
  };

  async cacheFile(path: string, name: any) {

    if (!name) {
      name = path.split('/').pop();
    }

    let data = await this.base64FromPath(path);
    let params: WriteFileOptions = {
      path: name,
      data: data,
      directory: Directory.Cache,
    };
    let res = await Filesystem.writeFile(params);
    console.log('res cache : ', res);

    return res;
  };

  async base64FromPath(path: string): Promise<string> {
    return new Promise((resolve, reject) => {

      this.http
        .get(apiUrl + 'download', {
          params: {
            link: path
          },
          responseType: 'blob'
        }).subscribe((res) => {
          const blob = res;
          console.log('blobl : ', res);
          const fileReader = new FileReader();
          const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
          const reader = zoneOriginalInstance || fileReader;
          reader.onerror = reject;
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject('method did not return a string');
            }
          };
          reader.readAsDataURL(blob);
        })
      // const blob = await response.blob();

    });
  }


  base64toBlob(b64Data: string | Blob, contentType = '', sliceSize = 512) {
    if (b64Data instanceof Blob)
      return b64Data;

    console.log('base64 : ', { data: b64Data })
    //@ts-ignore
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;

  }
}
