import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  _result: any;
  eleve:any;
  eleves:any;

  constructor(
    private navCtrl: NavController,
    private apiservice: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private router: Router,
  ) {
    this.eleve = this.parentservice.currentEleve;
    this.eleves = this.parentservice.eleves;
   }

  getData(): void {
    this.apiservice.get(
      { 
        user_id: this.authservice.user,
        parent_id: this.authservice.parent,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'messages')
        .subscribe(
            result => { 
              this._result = result;
              console.log(this._result)
            }, 
            error => console.log("Error :: " + error)
        )
  }

  ngOnInit(): void {
      this.getData();
  }

  nouveauMessage(){
    this.router.navigate(['/parent/nouveau-message'],{
      queryParams: {
        translation: JSON.stringify(this._result.translation),
        themes: JSON.stringify(this._result.themes),
        
      }
    })
    // this.navCtrl.push(NouveauMessagePage,{translation: this._result.translation,themes : this._result.themes});
  }

  detailsMessage(result: any){
    result.translation = this._result.translation;

    this.navCtrl.navigateRoot(['/parent/conversation'],{
      queryParams: {
        result: JSON.stringify(result),
        themes : JSON.stringify(this._result.themes),
        translation: JSON.stringify(this._result.translation)
        
      }
    })

    // this.router.navigate(['/parent/conversation'],{
    //   queryParams: {
    //     result: JSON.stringify(result),
    //     themes : JSON.stringify(this._result.themes),
    //     translation: JSON.stringify(this._result.translation)
        
    //   }
    // })
    // this.navCtrl.push(ConversationPage,{result: result});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Messages & NotesPage');
  }

}
