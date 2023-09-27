import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { MessageService } from './service/message.service';
import { InfiniteScrollCustomEvent, IonAccordionGroup, IonContent, IonIcon, IonImg, IonInfiniteScroll, IonModal } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { FileService } from 'src/app/services/file.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
// import Swiper from 'swiper';
// import { SwiperSlide } from 'swiper/element';
// import { GlobalService } from '../globalService/global.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  //@ts-ignore
  @ViewChild("messageGroup") group: IonAccordionGroup
  //@ts-ignore
  @ViewChild("messages") content: IonContent
  //@ts-ignore
  @ViewChild("infinity") infinity: IonInfiniteScroll
  //@ts-ignore
  @ViewChild("fileModal") modal: IonModal
  //@ts-ignore
  @ViewChild("fileInp") fileInp: ElementRef
  //@ts-ignore
  @ViewChild("swiperModal") swiperModal: ElementRef

  private endPoint = "admin_message_ens"

  _result: any;
  public messagesNonLus: Array<any> = [];
  public messagesLus: Array<any> = [];
  //@ts-ignore
  public selectedMsg: Array<any> = undefined;
  public MsgIsLoad: Boolean = false;
  public convertationIsLoad: Boolean = false;
  public limit: Boolean = true;
  //@ts-ignore
  public textVal: string;
  public filesVal = [];
  public filePreviews = []
  public fileIsEmpty: boolean = true
  //@ts-ignore
  private observe;
  //@ts-ignore
  public selectedOne: number = undefined;

  constructor(
    private file: FileService,
    private datePipe: DatePipe,
    private authservice: AuthService,
    private apiservice: ApiService
    // private global: GlobalService
  ) {
  }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.convertationIsLoad = true
    this.initialize()
  }

  ionViewWillLeave() {
    this.group.value = undefined
    this.messagesNonLus = [];
    this.messagesLus = [];
    //@ts-ignore
    this.selectedMsg = undefined;
    this.MsgIsLoad = false;
    this.limit = true;
    //@ts-ignore
    this.textVal = null;
    this.filesVal = [];
    this.filePreviews = []
    this.observe = undefined;
    //@ts-ignore
    this.selectedOne = undefined;
    this.fileIsEmpty = true
  }

  // fetch data

  initialize() {
    this.apiservice.get({
      user_id: this.authservice.admin,
    }, this.endPoint)
      .subscribe((elt) => {
        this._result = elt;
        this.messagesNonLus = elt?.messages_non_lu;
        this.messagesLus = elt?.messages_lu;
        this.convertationIsLoad = false
      })
  }



  async scrollDown(elt = null) {
    // setTimeout(() => {
    if (this.content != null) {
      // setTimeout(() => {
      this.content.scrollToBottom()
      // }, 100);
    }

  }

  //@ts-ignore
  private fetchMsg(userTo: number, type: string = null) {

    this.apiservice.get({
      user_id: this.authservice.admin,
      otherId: userTo,
      type: type,
      limit: 0
    }, this.endPoint)
      .subscribe((elt) => {
        this.selectedMsg = elt
        console.log(elt);

        // setTimeout(() => {
        this.MsgIsLoad = false;

        setTimeout(() => {
          if (elt.length < 10) {
            this.infinity.disabled = true;
          }

          this.scrollDown(elt);
        }, 100)
        // }, 1000);
      })

  }

  accordionChange(event: any) {
    if (event.target.tagName !== "ION-TEXTAREA") {

      const other = this.group.value as string;
      if (this.observe) {

        // this.observe.unsubscribe()
        this.observe = undefined
        //@ts-ignore
        this.selectedMsg = undefined;
        this.MsgIsLoad = false
        // this.selectedOne = undefined
      }
      if (other !== undefined) {
        this.MsgIsLoad = true
        // setTimeout(() => {
        let type = null
        let userId = other
        if (isNaN(+other)) {
          type = 'eleve'
          userId = other.split('-')[1]
        }
        this.selectedOne = +userId


        //@ts-ignore
        this.fetchMsg(+userId, type);

      } else {
        // console.log(this.selectedOne);

        let findIndex = this.messagesNonLus.findIndex(elt => elt.Id == this.selectedOne)
        if (findIndex !== -1) {
          setTimeout(() => {
            let item = this.messagesNonLus[findIndex]
            this.messagesNonLus.splice(findIndex, 1)
            setTimeout(() => {
              //@ts-ignore
              console.log(document.querySelector(".no-data.non-lus").classList.add("animate-message"));
              this.messagesLus.unshift(item)
            }, 100);
          }, 300);
        }


        //@ts-ignore
        this.selectedMsg = undefined
        //@ts-ignore
        this.selectedOne = undefined
        //@ts-ignore
        this.textVal = null
        this.filePreviews = []
        this.filesVal = []
        this.fileIsEmpty = true

      }
    }
  }

  loadMsg(event: any) {
    // (event as InfiniteScrollCustomEvent).target.complete()
    (event as InfiniteScrollCustomEvent).target.complete

    const other = this.group.value as string
    let type = null
    let userId = other
    if (isNaN(+other)) {
      type = 'eleve'
      userId = other.split('-')[1]
    }
    let limit = this.selectedMsg.length
    this.apiservice.get({
      user_id: this.authservice.admin,
      otherId: userId, 
       type: type, 
       limit: limit 
      }, this.endPoint)
      .subscribe(async (elt) => {
        if (elt.length < 10) {
          this.infinity.disabled = true

        }


        this.selectedMsg = [...elt, ...this.selectedMsg]

        // setTimeout(async () => {
        await this.infinity.complete();
        // }, 1000)


      })
  }





  //  send Mesage method

  sendMsg($event: any, isLus: boolean, channel: string) {
    $event.stopPropagation();

    if (!!this.textVal || this.filesVal.length != 0) {
      let userId = this.group.value
      //@ts-ignore
      if (isNaN(+userId)) {
        userId = (<string>userId).split('-')[1]
      }
      //@ts-ignore
      this.selectedOne = +userId

      let text = this.textVal
      let files = this.filesVal
      //@ts-ignore
      this.createRow(+userId, isLus)
      setTimeout(() => {
        this.scrollDown()
      }, 100);

      let hasMsg = text === null || text === "" || text === undefined ? false : true
      //@ts-ignore
      this.apiservice.post({ message: text, files: files, hasMsg: hasMsg, channel: channel, Reqtype: "send", converatation: +userId }, this.endPoint).subscribe((elt) => {
        this.selectedMsg[this.selectedMsg.length - 1].hasFile = elt
      })
    }
  }


  createRow(val: number, isLus: boolean) {
    //@ts-ignore
    let hasFile = []

    this.filesVal.forEach(() => {
      let obj = {
        sending: true,
        file: null,
        fileName: "sending...",
        fileType: null,
        type: null
      }
      hasFile.push(obj)
    })
    // this.MsgIsSending = true

    let d = new Date()
    let newMessage = {
      date: this.datePipe.transform(d, "H:mm"),
      //@ts-ignore
      hasFile: hasFile,
      message: this.textVal,
      par: "",
      sendBy: "1"
    }
    if (isLus) {

      this.messagesLus.forEach((elt) => {
        if (elt.Id == val) {
          elt.lastMsg = this.textVal
        }
      })
    } else {

      this.messagesNonLus.forEach((elt) => {
        if (elt.Id == val) {
          elt.lastMsg = this.textVal
        }
      })

    }
    //@ts-ignore
    this.textVal = null
    this.filesVal = []
    this.fileIsEmpty = true

    this.selectedMsg.push(newMessage)
  }

  // all files method
  downloadFile(fileUrl: string, name: any) {
    this.file.downloadFile(fileUrl, name)
  }

  deleteFile(file: any) {
    console.log(this.filesVal);
    const index = this.filesVal.findIndex((elt) => elt == file)
    this.filesVal.splice(index, 1)
    //@ts-ignore
    const indexPr = this.filePreviews.findIndex((elt) => elt.file == file)
    this.filePreviews.splice(indexPr, 1)
    console.log(this.filesVal);

  }

  // async selectImages(event = null) {
  //   this.modal.dismiss()
  //   let images = await this.file.pickImages()
  //   // console.log(images);

  //   this.filesVal.push(...images)
  //   this.displayFiles(images, "image")
  //   this.modal.present()
  // }

  displayFiles(files: any, type: string) {
    files.forEach((file: any, i: any) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        let obj = { path: result, type: type, file: files }
        //@ts-ignore
        this.filePreviews.push(obj);
        // this.createSlides(obj, this.filePreviews.length, file)
      };

      reader.readAsDataURL(file);
    });
  }

  openFile() {
    this.fileInp.nativeElement.click()
  }

  pickFile(event: any) {
    console.log(event.target.files);
    const files = event.target.files as Array<File>
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      //@ts-ignore
      this.filesVal.push(file)
      //@ts-ignore
      this.filePreviews.push(file.name)
    }
    this.fileIsEmpty = false
  }

  splitFileName(FileNames: Array<string>) {
    return FileNames.join(", ")
  }

  rmvSelectedFile() {
    this.fileIsEmpty = true
    this.filesVal = [];
    setTimeout(() => {
      this.filePreviews = []
    }, 500);
  }
}