import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  _result: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }


  getData(): void {
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.parentservice.parentId,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
      }, 'notifications')
      .subscribe(
        result => {
          console.log(result);
          this._result = result;
        },
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
  }

  async notification(notification: any) {
    if (!notification.type_ressource) {
      let confirmAlert = await this.alertCtrl.create({
        header: notification.label,
        message: notification.message,
        cssClass: 'notification-alert',
        buttons: [{
          text: 'Fermer',
          role: 'cancel'
        }]
      });
      confirmAlert.present();
    } else {
      console.log(notification)
      switch (notification.type_ressource) {
        case 'album':
          this.router.navigate(['/eleve/album_photo'], {
            queryParams: {
              post: notification.id_ressource
            }
          });
          break;
        case 'actualites':
          this.router.navigate(['/eleve/nouveautes'], {
            queryParams: {
              post: notification.id_ressource
            }
          });
          break;
        case 'blog':
          this.router.navigate(['/eleve/nouveautes'], {
            queryParams: {
              post: notification.id_ressource
            }
          });
          break;
        case 'cahier-de-liaison':
          this.router.navigate(['/eleve/devoir'], {
            queryParams: {
              id: notification.id_ressource
            }
          });
          break;
        case 'devoir-individuel':
          this.router.navigate(['/eleve/devoir'], {
            queryParams: {
              id: notification.id_ressource
            }
          });
          break;
        case 'note':
          this.router.navigate(['/eleve/nouveautes'], {
            queryParams: {
              post: notification.id_ressource
            }
          });
          break;
        case 'ressource':
          // this.navCtrl.push()
          // $pageTo =  'eleve_resources';
          break;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Messages & NotesPage');
  }

}
