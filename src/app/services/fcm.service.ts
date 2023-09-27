import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { ParentService } from './parent.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  initiated = false;

  notifs: any[] = [];

  constructor(
    private router: Router,
    private nav: NavController,
    private apiService: ApiService,
    private parentservice: ParentService,
  ) { }

  async initPush() {
    if (Capacitor.isNativePlatform()) {
      await PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: any) => {
            
            console.log('Push received: ' + JSON.stringify(notification));
            this.notifs.push(notification);
        }
      );
  
      await PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (notification: any) => {
          console.log('notification : ',notification)
          const data = notification.notification.data;
          if (data.page) {
            let pageTo = data.page;
            let queryParams = {}
            if(data.resource){
              queryParams = { resource: data.resource }
            }
            let notif_eleves = null;
            
            if(data.eleves)
            notif_eleves = JSON.parse(data.eleves);

            let notif_classes = null;
            
            if(data.classes)
            notif_classes = JSON.parse(data.classes);

            let notif_niveaux = null;
            
            if(data.niveaux)
            notif_niveaux = JSON.parse(data.niveaux);

            let notif_cycles = null;
            
            if(data.cycles)
            notif_cycles = JSON.parse(data.cycles);

            let notif_sites = null;
            
            if(data.sites)
            notif_sites = JSON.parse(data.sites);

            let notif_services = null;
            
            if(data.services)
            notif_services = JSON.parse(data.services);


            // let eleve = null;
            if(pageTo.includes('/parent/')){
              
              if(notif_eleves&&notif_eleves.length>0){
                console.log('received eleves',data.eleves)
                console.log('received eleves parsed',notif_eleves)
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  if(notif_eleves.includes(eleve.id)){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else if(notif_classes&&notif_classes.length>0){
                // notif_classes = JSON.parse(data.classes); 
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  if(notif_classes.includes(eleve.classe_id)){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else if(notif_niveaux&&notif_niveaux.length>0){
                // notif_niveaux = JSON.parse(data.niveaux); 
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  if(notif_niveaux.includes(eleve.niveau_id)){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else if(notif_cycles&&notif_cycles.length>0){
                // notif_cycles = JSON.parse(data.cycles); 
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  if(notif_cycles.includes(eleve.cycle_id)){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else if(notif_sites&&notif_sites.length>0){
                // notif_sites = JSON.parse(data.sites); 
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  if(notif_sites.includes(eleve.site_id)){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else if(notif_services&&notif_services.length>0){
                // notif_services = JSON.parse(data.services); 
                let eleves = this.parentservice.eleves;
                for (let index = 0; index < eleves.length; index++) {
                  const eleve = eleves[index];
                  let contains_service = notif_services.some((serv_pyload:any) => {
                    return eleve.services.includes(serv_pyload);
                  }); 
                  if(contains_service){
                    this.parentservice.switchEleve(eleve).then(() => {
                      console.log('eleve navigating')
                      this.nav.navigateRoot([pageTo], {
                        queryParams : queryParams
                      }).then(()=>{
                        console.log('eleve navigated')
  
                      });
                    });
                    break;
                  }
                  
                }
              }else{
                this.nav.navigateRoot([pageTo], {
                  queryParams: { resource: data.resource }
                })
              }

            }else{
              this.nav.navigateRoot([pageTo], {
                queryParams: { resource: data.resource }
              }).then(()=>{
                // this.nav.navigateForward(['/enseignant/messages'], {
                //   queryParams: { resource: data.resource }
                // });
              })
              // switch (pageTo) {
              //   case 'prof_messages':
              //     this.nav.navigateRoot(['/enseignant/planning']).then(()=>{
              //       this.nav.navigateForward(['/enseignant/messages'], {
              //         queryParams: { reference: data.resource }
              //       });
              //     })
              //     break;
              //   case 'prof_nouveaute':
              //     this.nav.navigateRoot(['/enseignant/planning']).then(()=>{
              //       this.nav.navigateForward(['/enseignant/nouveautes'], {
              //         queryParams: { reference: data.resource }
              //       });
              //     })
              //     break;
              //   case 'prof':
              //     this.nav.navigateRoot(['/enseignant/planning'])
              //     break;
              //   case 'pick':
              //     // this.switchToTransport();
              //     break;
              //   default:
              //     this.nav.navigateForward(['/parent/notifications']);
              // }
            }
            console.log('page to',pageTo)
            console.log('parent service eleve',this.parentservice.eleves)
          }

        }
      );
  
      this.initiated = true
    }
  }

  async registerPush(user_id:any,parent_id:any,enseignant_id:any,key:any) {
    let permission : any = await PushNotifications.requestPermissions()

    if (permission.receive == 'granted') {
      await PushNotifications.register();
    } else {
      permission = await PushNotifications.requestPermissions()
      
      if (permission.receive == 'granted') {
        PushNotifications.register();
      }
    }

    await PushNotifications.addListener(
      'registration',
      (token: Token) => {
        console.log('My token: ' + JSON.stringify(token));
        let query = {
          token: token.value ,
          user_id: user_id ,
          parent_id: parent_id ,
          enseignant_id: enseignant_id ,
          key: key
        };
        console.log(query);
        this.apiService.post(query, 'token').subscribe((result)=>{
          console.log('token res ',result);
        });

      }
    );

    await PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

  }
}