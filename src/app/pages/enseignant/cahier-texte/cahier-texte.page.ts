import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cahier-texte',
  templateUrl: './cahier-texte.page.html',
  styleUrls: ['./cahier-texte.page.scss'],
})
export class CahierTextePage implements OnInit {

  cours: any;
  file: any = null;
  isSending: boolean = false;
  sent: boolean = false;
  response: any;
  resulta: any;
  loading: any;
  public formGroup: FormGroup;
  editFile: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    private storage: Storage,
    private apiSerivce: ApiService,
    private authservice: AuthService
  ) {
    this.formGroup = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfCachierTextPage');
  }

  ngOnInit(): void {
    this.storage.get('cours').then((value) => {
      this.cours = value;
      this.getData();
    });
  }

  // @ts-ignore
  uploadFile(event: any) {
    console.log('uploaded file', event)

    if (event.target.files.length === 0)
      return null;

    this.file = event.target.files[0];
    this.editFile = true;

    console.log('uploaded file', this.file)
  }

  prepareData() {


    let fileObj = this.file ? {
      name: this.file?.name,
      file: this.file
    } : null;
    let data: any = {
      cours_id: this.cours.id,
      enseignant_id: this.authservice.enseignant,
      key: this.authservice.token,
      content: this.formGroup.value.content,
      file: fileObj,
    };

    if (this.editFile)
      data.edit_file = "ok";

    if (this.resulta.seance_journal)
      data.seance_journal_id = this.resulta.seance_journal.id;

      console.log('sent data', data)

    return data

  }


  getData(): void {
    this.apiSerivce.get(
      {
        cours_id: this.cours.id,
        enseignant_id: this.authservice.enseignant,
        key: this.authservice.token,
      }, 'prof_cachier_text')
      .subscribe(
        result => {
          this.resulta = result;
          if (this.resulta.seance_journal)
            this.file = this.resulta.seance_journal.file;
          if (this.resulta.seance_journal) {
            this.formGroup.setValue({ 'content': this.resulta.seance_journal.content })
          }
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }


  send() {
    this.isSending = true;
    this.sent = false;
    this.apiSerivce.post(this.prepareData(), 'prof_cachier_text').subscribe((res: any) => {
      this.isSending = false;
      this.sent = true;
      this.resulta = res;
      if (this.resulta.seance_journal)
        this.file = this.resulta.seance_journal.file;
      if (this.resulta.seance_journal) {
        this.formGroup.setValue({ 'content': this.resulta.seance_journal.content })
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteFile(e: any) {
    this.file = null;
    this.editFile = true;
  }

}
