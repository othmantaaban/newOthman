import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.page.html',
  styleUrls: ['./experience-form.page.scss'],
})
export class ExperienceFormPage implements OnInit {
  _result = {
    translation : {
      "monProfil" : "mon profil",
      "experience" : "Expérience professionnelle",
      "retour" : "retour",
      "organisme": "Organisme",
      "secteur": "Secteur d’activité",
      "nature": "Nature de l’emploi",
      "etablissement": "Etablissement",
      "dateFin": "Date Fin",
      "dateDebut": "Date Début",
      "fonction": "Fonction",
      "mission":"Mission"
    }
  }

  // @ts-ignore
  // _result;

  // @ts-ignore
  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl : NavController,
    private apiService : ApiService,
    private authService : AuthService,
    private parentService : ParentService
  ) {
    this.form = this.formBuilder.group({
      organisme : [
        "",
        [Validators.required]
      ],
      // secteur : [
      //   "",
      //   [Validators.required]
      // ],
      nature : [
        "",
        [Validators.required]
      ],
      datedebut : [
        null,
        [Validators.required]
      ],
      datefin : [
        null,
        [Validators.required]
      ],
      fonction: [
        null,
        [ 
          Validators.required,
        ]
      ],
      // mission : [
      //   "",
      //   [Validators.required]
      // ]
    })
  }


  back() {
    this.navCtrl.back()
  }

  yearselcted(e : Event) {
    console.log(this.form.get('date').value);
    
  }

  ionViewWillEnter() {
  }
  
  ngOnInit() {
    this.apiService.get(
      {        
        user_id : this.authService.user,
        parent_id : this.parentService.parentId,
        key  : this.authService.token,
      }, "add-experience")
      .subscribe(elt => {
        this._result = elt
      },
      error => console.log(error)
      
      )
  }

  submit() {
    // ->set('Nature', $_POST['nature'])
    // ->set('Organisme', $_POST['organisme'])
    // ->set('Fonction', $_POST['fonction'])
    // ->set('Date_debut', $_POST['datedebut'])
    // ->set('Date_fin', $_POST['datefin'])
    this.apiService.post(
      {
        user_id : this.authService.user,
        parent_id : this.parentService.parentId,
        key  : this.authService.token,
        nature : this.form.get("nature").value,
        organisme : this.form.get("organisme").value,
        fonction : this.form.get("fonction").value,
        datedebut : this.form.get("datedebut").value,
        datefin : this.form.get("datefin").value,
      },
      "add-experience"
    ).subscribe(
      elt => {
        this.navCtrl.navigateRoot("/eleve/mon-profil")        
      }
    )
    console.log(this.form.valid); 
  }

}
