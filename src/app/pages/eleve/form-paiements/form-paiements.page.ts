import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-form-paiements',
  templateUrl: './form-paiements.page.html',
  styleUrls: ['./form-paiements.page.scss'],
})
export class FormPaiementsPage implements OnInit {

  _result: any = {};

  eleves: any[] = [];

  mode: any = undefined;

  formValues: any = {
    eleves: [],
    type: '',
    montant: '',
    date: '',
    commentaire: '',
    file: {},
    details: {
      numero: '',
    }
  };

  constructor(
    private parentService: ParentService,
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private alertController: AlertController
  ) {
    this.eleves = this.parentService.eleves;
  }
  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.apiservice.get(
      {
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        form: 1
      }, 'paiements')
      .subscribe(
        results => {
          this._result = results;
        }
        ,
        error => console.log("Error :: " + error)
      )
  }

  toggleSelectEleve(eleveId: any){
    let index = this.formValues.eleves.indexOf(eleveId); 
    if(index >= 0){
      this.formValues.eleves.splice(index,1);
    }else{
      this.formValues.eleves.push(eleveId);
    }
  }

  toggleSelectType(mode: any){
    this.formValues.details = {};
    if(this.formValues.type == mode.alias){
      this.formValues.type = '';
      this.mode = '';
    }else{
      this.formValues.type = mode.alias;
      this.mode = mode
    }
  }

  toggleInput($event: any){
    let input = $event.target.nextSibling;
    
    if(input)
    input.click();
  }

  selectFile($event: any){
    let files = $event.target.files;

    if(files && files.length > 0){
      this.formValues.file = files[0];
    }
  }

  changeDetail(alias: string,event: any){
    this.formValues.details[alias] = event.target.value;
  }

  sendPaiement(){
    if(this.formValues.eleves.length == 0)
    return this.showAlert('Veuillez choisir un élève !');

    if(!this.formValues.type)
    return this.showAlert('Veuillez choisir un type !');

    for (let index = 0; index < this.mode.details.length; index++) {
      const element = this.mode.details[index];
      if(!this.formValues.details[element.alias]){
        return this.showAlert(`Veuillez saisir ${element.label} !`);
        break;
      }
    }
    
    if(!this.formValues.montant)
    return this.showAlert('Veuillez saisir le montant !');
    
    if(!this.formValues.date)
    return this.showAlert('Veuillez saisir la date !');

    if(!this.formValues.file)
    return this.showAlert('Veuillez choisir un fichier !');


    console.log((typeof this.formValues.eleves))

    let formdata = {
      "eleves[]": this.formValues.eleves,
      "type": this.formValues.type,
      "date": this.formValues.date,
      "commentaire": this.formValues.commentaire,
      "details": JSON.stringify(this.formValues.details),
      "montant": this.formValues.montant,
      "file": {
        file: this.formValues.file,
        name: this.formValues.file.name
      },
    };

    console.log('formdata : ',(formdata.file))

    return this.apiservice.post(formdata,'paiements')
    .subscribe(
      results => {

      }
      ,
      error => console.log("Error :: " + error)
    )


    
  }

  async showAlert(message: string){
    let alert = await this.alertController.create({
      cssClass: 'success_alert_boti',
      header: message,
      message: '',
      buttons: [{
        text: 'Fermer',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    alert.present();
  }
  
  toBase64(file: any) {
    return (new Promise((resolve, reject) => {
      const reader = this.getFileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }));
  }

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }
}
