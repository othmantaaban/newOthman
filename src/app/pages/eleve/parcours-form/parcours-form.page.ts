import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-parcours-form',
  templateUrl: './parcours-form.page.html',
  styleUrls: ['./parcours-form.page.scss'],
})
export class ParcoursFormPage implements OnInit {
  _result = {
    translation : {
      "monProfil" : "mon profil",
      "parcours" : "Parcours académique",
      "retour" : "retour",
      "niveau": "Niveau",
      "diplome": "Diplôme",
      "specialite": "Spécialité",
      "etablissement": "Etablissement",
      "obtention": "Date d’obtention",
      "mention": "Mention",
      "description":"Description"
    }
  }


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
      niveau : [
        "",
        [Validators.required]
      ],
      diplome : [
        "",
        [Validators.required]
      ],
      // specialite : [
      //   "",
      //   [Validators.required]
      // ],
      etablisement : [
        "",
        [Validators.required]
      ],
      date : [
      //   null,
      //   [
      //     Validators.required,
      //   ]
      ],
      mention: [
        null,
        [ 
          Validators.required,
          Validators.min(0),
          Validators.max(20),
        ]
      ],
      // description : [
      //   "",
      // ]
    })
 }

  ngOnInit() {
    this.apiService.get(
      {        
        user_id : this.authService.user,
        parent_id : this.parentService.parentId,
        key  : this.authService.token,
      }, "add-parcours")
      .subscribe(elt => {
        this._result = elt
      },
      error => console.log(error)
      
      )
  }

  back() {
    this.navCtrl.back()
  }
  yearselcted(e : Event) {
    console.log(this.form.get('date').value);
    
  }

  submit() {
    this.apiService.post(
      {
        user_id : this.authService.user,
        parent_id : this.parentService.parentId,
        key  : this.authService.token,
        niveau : this.form.get("niveau").value,
        diplome : this.form.get("diplome").value,
        specialite : this.form.get("specialite").value,
        etablisement : this.form.get("etablisement").value,
        date : this.form.get("date").value,
        mention : this.form.get("mention").value,
        description : this.form.get("description").value,
      },
      "add_parcours"
    ).subscribe(
      elt => {
        this.navCtrl.navigateRoot("/eleve/mon-profil", { state : { state: true } })        
      }
    )
    console.log(this.form.valid); 
  }

}
