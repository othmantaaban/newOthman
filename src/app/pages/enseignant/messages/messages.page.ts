import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  _result: any;

  constructor(
    public navCtrl: NavController,
    public authservice: AuthService,
    public route: ActivatedRoute,
    private apiSerivce: ApiService
    ) { }

    getData(): void {
      this.apiSerivce.get(
        { 
          enseignant_id : this.authservice.enseignant,
          key  : this.authservice.token,
        }, 'prof_messages')
          .subscribe(
              result => { 
                this._result = result;
                if(this.route.snapshot.queryParamMap.has('resource')){
                  this._result.data.forEach((reference: any) => {
                    if(this.route.snapshot.queryParamMap.get('resource')==reference.id){
                      this.detailsMessage(reference);
                      }
                   });
                  } 
              }, 
              error => console.log("Error :: " + error)
          )
    }
  
    ngOnInit(): void {
        this.getData();
    }
  
    nouveauMessage(){
      this.navCtrl.navigateForward(['/enseignant/messages-form'],{
        queryParams: { translation: JSON.stringify(this._result.translation) }
      });
    }
    
    detailsMessage(reference:any){
      reference.translation = this._result.translation;
      this.navCtrl.navigateForward(['/enseignant/message-conversation'],{
        queryParams: { reference: JSON.stringify(reference) }
        
      });
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad Messages & NotesPage');
    }

}
