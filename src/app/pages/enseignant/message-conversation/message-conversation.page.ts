import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { Filesystem, Directory, Encoding, WriteFileOptions } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-message-conversation',
  templateUrl: './message-conversation.page.html',
  styleUrls: ['./message-conversation.page.scss'],
})
export class MessageConversationPage implements OnInit {
  // @ts-ignore
  @ViewChild("conversationMessages") conversationMessages;

  reference: any;
  _result: any;
  public message: any;
  // @ts-ignore: Unreachable code error
  private formGroup: FormGroup;

  messageContent: any;
  // messageThematique: any;
  messagefile: any = null;
  recordingAudio: boolean = false;
  recordOn: boolean = false;
  audioBars: any[] = [];
  recordAudio: MediaObject | any = null;
  recordAudioFileDetails: any = null;
  recordInterval: any = null;
  // @ts-ignore
  playingAudio: MediaObject = null;
  result: any;
  isCordova = (Capacitor.platform !== 'web');

  isSending: boolean = false;


  constructor(
    public navCtrl: NavController,
    public apiSerivce: ApiService,
    public authservice: AuthService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private media: Media,
    private file: File,
    private fs: FileService,
    private platform: Platform,
    private cd: ChangeDetectorRef
  ) {
    // @ts-ignore
    this.reference = JSON.parse(this.route.snapshot.queryParamMap.get("reference"));
    console.log(this.reference);
    
    this._result = this.reference.conversation;
    // console.log(this._result);
    this.formGroup = this.formBuilder.group({
      message: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailsMessagePage");
    // this.isCordova = ;
    // console.log("isCordova"+this.isCordova);

    if (this.conversationMessages)
      this.conversationMessages.nativeElement.scrollTop =
        this.conversationMessages.nativeElement.scrollHeight;
  }

  getData(): void {
    this.apiSerivce
      .get(
        {
          reference: this.reference.id,
          enseignant_id: this.authservice.enseignant,
          key: this.authservice.token,
        },
        "prof_messages"
      )
      .subscribe(
        (result) => {
          this.result = result;
          console.log(result);
          
        },
        (error) => console.log("Error :: " + error)
      );
  }

  ngOnInit(): void {
    this.getData();
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
    if (!this.isSending) {
      this.isSending = true;

      let audio: any = null;
      if (this.recordAudio) {
        clearInterval(this.recordInterval)
        this.audioBars = [];
        this.recordOn = false;
        await this.recordAudio.stopRecord();
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

      this.apiSerivce.post({
        ref: this.reference.id,
        sujet: '',
        message: this.messageContent,
        file: this.messagefile?{ 
          file: this.messagefile,
          name: this.messagefile.name
        }:null,
        enseignant_id: this.authservice.enseignant,
        audio: audio,
        key: this.authservice.token
      }, "prof_messages").subscribe(
        (result) => {
          this.isSending = false;
          this.navCtrl.navigateRoot(['/enseignant/planning'], { queryParams: { data: JSON.stringify(result) } });
        },
        (error) => {
          this.isSending = false;
          //alert(error);
          console.log("Error :: " + error);
          //this.loading.dismiss().catch();
        }
      );
    }
  }

  toggleRecordAudio() {
    if (!this.recordingAudio) {
      const filePath = this.file.cacheDirectory;
      const filename = `recording_${Date.now()}.${this.platform.is("android") ? "aac" : "m4a"
        }`;
      let recordAudioPath =
        `${this.platform.is("android")
          ? filePath
          : filePath.replace("file://", "")
        }` + filename;
      console.log(filePath);
      console.log(filename);
      console.log(recordAudioPath);
      this.recordAudioFileDetails = {
        path: filePath,
        name: filename,
      };
      this.file.createFile(filePath, filename, true).then((fileEntry) => {
        this.recordAudio = this.media.create(recordAudioPath);

        this.recordingAudio = true;
        this.recordOn = true;
        this.recordAudio.startRecord();
        this.recordAudio.onSuccess.subscribe(() => {
          console.log("audio success");
        });
        this.recordInterval = setInterval(() => {
          if (this.recordOn)
            this.recordAudio.getCurrentAmplitude().then((amplitude: any) => {
              console.log(amplitude);
              this.audioBars.push(amplitude * 100);
            });
        }, 500);
      });
    } else {
      // const audio: MediaObject = this.media.create(this.recordPath);
      // if(this.recordInterval&&this.recordAudio){
      clearInterval(this.recordInterval);
      this.audioBars = [];
      this.recordOn = false;
      this.recordingAudio = false;
      this.recordAudio.stopRecord();
      this.recordAudio = null;
      console.log(this.recordAudio);
      // this.recordAudio.
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

      buffer = this.fs.base64toBlob(fileRes.data, type)

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
      message.bars.push(height * 100);
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
    this.fs.cacheFile(audio.path, audio.filename).then((res) => {
      console.log('res : ', res);

      try {
        this.playingAudio = this.media.create(res.uri);
        // console.log('res : ',res);
      } catch (error) {
        console.log(error);
      }
      this.playingAudio.onStatusUpdate.subscribe(status => {
        console.log("Status :", status);
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


  pauseAudio() {
    if (this.playingAudio) {
      this.playingAudio.pause();
    }
  }

  stopAudio() {
    if (this.playingAudio) {
      this.playingAudio.stop();
    }
  }

  public downloadFile(fileName: any, filePath: any) {
    this.fs.downloadFile(filePath, fileName);
  }

}
