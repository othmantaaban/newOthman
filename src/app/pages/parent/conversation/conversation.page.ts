import { Component, OnInit, ViewChild, ChangeDetectorRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AlertInput, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ParentService } from 'src/app/services/parent.service';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Filesystem, Directory, Encoding, WriteFileOptions } from '@capacitor/filesystem';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage {

  @ViewChild('conversationMessages') conversationMessages: any;

  translation: any;
  themes: any;
  result: any;
  eleve: any;
  // private fileTransfer: FileTransferObject;
  messageContent: any;
  messageThematique: any;
  messagefile: any = null;
  recordingAudio: boolean = false;
  recordOn: boolean = false;
  audioBars: any[] = [];
  // @ts-ignore: Unreachable code error
  recordAudio: MediaObject | any = null;
  recordAudioFileDetails: any = null;
  recordInterval: any = null;
  // @ts-ignore: Unreachable code error
  playingAudio: MediaObject = null;

  isCordova = false;

  isSending: boolean = false;

  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private route: ActivatedRoute,
    private fileservice: FileService,
    private alertCtrl: AlertController,
    private media: Media,
    private platform: Platform,
    private cd: ChangeDetectorRef
  ) {
    this.result = this.route.snapshot.queryParamMap.get('result');
    if (this.result)
      this.result = JSON.parse(this.result);

    this.themes = this.route.snapshot.queryParamMap.get('themes');
    if (this.themes)
      this.themes = JSON.parse(this.themes);

    this.translation = this.route.snapshot.queryParamMap.get('translation');
    if (this.translation)
      this.translation = JSON.parse(this.translation);

    this.messageThematique = this.themes[0].id
    this.eleve = this.parentservice.currentEleve


    this.isCordova = this.platform.is('hybrid');

  }


  public downloadFile(fileName: any, filePath: any) {
    this.fileservice.downloadFile(filePath, fileName);

  }
  public updateFile(ev: any) {
    console.log(this.messagefile);

    if (ev.target.files.length > 0) {
      this.messagefile = ev.target.files[0];
    } else {
      this.messagefile = null;
    }
    console.log(this.messagefile);

  }

  public async sendMessage() {
    let audio: any = null;
    if (this.recordAudio) {
      clearInterval(this.recordInterval)
      this.audioBars = [];
      this.recordOn = false;
      this.recordAudio.stopRecord();
      // const directory = await this.file.resolveDirectoryUrl(this.recordAudioFileDetails.path);
      // const audioFileEntry = await this.file.getFile(directory, this.recordAudioFileDetails.name, { create: false });

      // console.log(audioFileEntry);

      let audioFile = await this.makeFileIntoBlob(this.recordAudioFileDetails.name, 'audio/' + (this.platform.is('android') ? 'aac' : 'm4a'));

      audio = {
        file: audioFile,
        name: this.recordAudioFileDetails.name
      };

      this.recordingAudio = false;
    }

    this.apiservice.post({
      ref: this.result.id,
      sujet: this.result.sujet,
      message: this.messageContent,
      theme: this.result.theme,
      file: this.messagefile?{ 
        file: this.messagefile,
        name: this.messagefile.name
      }:null,
      eleve_id: this.parentservice.currentEleve.id,
      parent_id: this.parentservice.parentId,
      key: this.authservice.token,
      audio: audio
    }, 'nouveau-message').subscribe(
      (res: any) => {
        this.result.conversation.push(res.message);
        this.messageContent = null;
        this.messagefile = null;
        this.conversationMessages.nativeElement.scrollTop = this.conversationMessages.nativeElement.scrollHeight;
        this.isSending = false
      },
      (error) => { this.isSending = false }
    );
  }

  async changeThematique() {
    let alert = await this.alertCtrl.create();

    alert.header = this.translation.theme;

    let inputs: AlertInput[] = [];

    this.themes.map((item: any) => {
      inputs.push({
        type: 'radio',
        label: item.label,
        value: item.id,
        checked: (item.id == this.messageThematique ? true : false)
      })

      return item;
    })

    alert.inputs = inputs;
    alert.buttons = [
      'Cancel',
      {
        text: 'OK',
        handler: data => {
          this.messageThematique = data;
        }
      }
    ];

    alert.present();
  }

  async toggleRecordAudio() {
    if (!this.recordingAudio) {

      const filePath = (await Filesystem.getUri({
        path: '/',
        directory: Directory.Cache
      })).uri;
      const filename = `recording_${Date.now()}.${this.platform.is('android') ? 'aac' : 'm4a'}`;
      let recordAudioPath = `${this.platform.is('android') ? filePath : filePath.replace('file://', '')}` + '/' + filename;
      console.log(filePath)
      console.log(filename)

      console.log(recordAudioPath)
      this.recordAudioFileDetails = {
        path: filePath,
        name: filename
      };
      this.recordAudio = this.media.create(recordAudioPath);

      this.recordingAudio = true;
      this.recordOn = true;
      this.recordAudio.startRecord();
      this.recordAudio.onSuccess.subscribe(() => {
        console.log('audio success');
      });
      this.recordInterval = setInterval(() => {
        if (this.recordOn)
          this.recordAudio.getCurrentAmplitude().then((amplitude: any) => {
            console.log(amplitude);
            this.audioBars.push((amplitude * 100));
          })
      }, 500);


    } else {
      // const audio: MediaObject = this.media.create(this.recordPath);
      // if(this.recordInterval&&this.recordAudio){
      clearInterval(this.recordInterval)
      this.audioBars = [];
      this.recordOn = false;
      this.recordingAudio = false;
      this.recordAudio.stopRecord();
      this.recordAudio = null;
      console.log(this.recordAudio)
      // this.recordAudio.
      // }

      // }

    }
  }

  pauseRecordAudio() {
    if (this.recordingAudio) {
      this.recordAudio.pauseRecord();
      this.recordOn = false;

    }
  }

  resumeRecordAudio() {
    if (this.recordingAudio) {
      this.recordAudio.resumeRecord();
      this.recordOn = true;

    }

  }

  async makeFileIntoBlob(name: any, type: any): Promise<any> {
    // let fileName = "";
    // let { name, nativeURL } = fileEntry;

    // get the path..
    // let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));

    // let fileName = name;
    console.log(`promise file entry`, name)
    // let buffer = await this.file.readAsArrayBuffer(path, name)
    let fileRes = await Filesystem.readFile({
      path: name,
      directory: Directory.Cache,
    })
    console.log(`promise file res`, fileRes)
    let buffer = null;
    if (fileRes) {

      buffer = this.fileservice.base64toBlob(fileRes.data, type)

      console.log(`promise file res`, buffer)
      // we are provided the name, so now read the file into
      // a buffer
      // get the buffer and make a blob to be saved
      let fileBlob = new Blob([buffer], {
        type: type,
      });

      console.log(`promise blob`, fileBlob)

      return fileBlob;
    }


  }

  async getAudioBars(message: any) {
    message.bars = [];
    let audio = this.media.create(message.audio);

    let duration = audio.getDuration();
    for (let index = 0; index < duration; index++) {
      audio.seekTo(index * 1000);
      let height = await audio.getCurrentAmplitude();
      message.bars.push((height * 100));
    }
  }

  playAudio(audio: any) {

    if (this.playingAudio) {
      this.playingAudio.stop();
    }
    // let path = this.file.cacheDirectory;
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // console.log(fileTransfer);
    console.log('audio : ', audio);
    this.fileservice.cacheFile(audio.path, audio.filename).then((res) => {
      console.log('res : ', res);

      try {
        this.playingAudio = this.media.create(res.uri);
        // console.log('res : ',res);
      } catch (error) {
        console.log(error);
      }
      this.playingAudio.onStatusUpdate.subscribe(status => {
        console.log("Status :",status);
        switch (status) {
          case 0:
            audio.isPlaying = false;
            break;
          case 1:
            audio.isPlaying = true;
            break;
          case 2:
            audio.isPlaying = true;
            break;
          case 3:
            audio.isPlaying = false;
            break;
          case 4:
            audio.isPlaying = false;
            break;
          default:
            audio.isPlaying = false;
            break;
        }
        this.cd.detectChanges();
      });
      console.log(this.playingAudio);
      this.playingAudio.play();
    })
    // fileTransfer.download(audio.path, path + audio.filename).then((entry) => {
    //   console.log(entry);
    //   try {
    //     this.playingAudio = this.media.create(entry.nativeURL);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   this.playingAudio.onStatusUpdate.subscribe(status => {
    //     switch (status) {
    //       case 0:
    //         audio.isPlaying = false;
    //         break;
    //       case 1:
    //         audio.isPlaying = true;
    //         break;
    //       case 2:
    //         audio.isPlaying = true;
    //         break;
    //       case 3:
    //         audio.isPlaying = false;
    //         break;
    //       case 4:
    //         audio.isPlaying = false;
    //         break;
    //       default:
    //         audio.isPlaying = false;
    //         break;
    //     }
    //   });
    //   console.log(entry.nativeURL);
    //   console.log(this.playingAudio);
    //   this.playingAudio.play();

    // }, (error) => {
    //   console.log(error)
    // });

  }

  pauseAudio(audio: any) {
    if (this.playingAudio) {
      this.playingAudio.pause();
    }
  }

  stopAudio(audio: any) {
    if (this.playingAudio) {
      this.playingAudio.stop();
    }
  }

}
