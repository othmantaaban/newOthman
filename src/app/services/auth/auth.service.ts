import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Capacitor } from '@capacitor/core';
import { ApiService } from '../api.service';
import { FcmService } from '../fcm.service';
import { ParentService } from '../parent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any;
  public token: any;

  public parent: any;
  public active_eleve: any;
  
  public eleve: any;

  public enseignant: any;

  public pick: any;

  public pointage: any;

  public admin: any;

  public acces: any;

  constructor(
    public navCtrl: NavController,
    private apiservice: ApiService,
    private router: Router,
    private storage: Storage,
    private parentService: ParentService,
    private fcm: FcmService
  ) { }

  async isLoggedIn(): Promise<boolean> {
    if (this.user && this.token) {
      return await this.checkUser(this.user,this.token);
    } else {
      await this.storage.create();
      const userId = await this.storage.get('boti_user');
      const userToken = await  this.storage.get('boti_token');
      if (userId && userToken) {
        this.user = userId;
        this.token = userToken;
      } else {
        await this.removeSession();
      }

      return await this.checkUser(this.user,this.token);
    }

  }


  async checkUser(user: number,token: string,acces: string|null = null): Promise<boolean> {
    return new Promise(resolve=>{
      if (user&&token) {
        this.apiservice.get({
          user_id: user,
          key: token,
          acces: acces
        }, 'acces_check').subscribe(async(res)=>{
            if(res && !res.disconnect){
              await this.setLoggedIn(res);
              await this.feedProviders(res);

              console.log('compte_check platform',Capacitor.getPlatform());
              console.log('compte_check native',Capacitor.isNativePlatform());
              

              if(Capacitor.isNativePlatform() && !this.fcm.initiated){
                await this.fcm.registerPush(user,this.parent,this.enseignant,token);
                await this.fcm.initPush();
              }

              if(document.documentElement.dir != res.dir){
                let reload = (document.documentElement.dir != res.dir);

                document.documentElement.dir = res.dir;
                
                if(reload){
                  await this.navCtrl.navigateRoot(['/blank']);
                  await this.navCtrl.navigateRoot(['/'],{
                    replaceUrl: true
                  });
                  console.log(this.router.url)
                }
              }
              if(res.lang){
                document.documentElement.lang = res.lang;
              }
              resolve(true);
            }else{
              await this.removeSession();
              resolve(false);
            }
        });
      }else{
        resolve(false);
      }
    });
  }

  checkValidity(validity: string): boolean {
    if (validity) {
      // console.log('validity : ', validity);
      return +new Date(validity) > +new Date();
    }

    return false;
  }

  async setLoggedIn(res: any) {
    console.log(res);
    this.user = res.userId;
    this.token = res.keyToken;

    await this.storage.create();

    await this.storage.set('boti_user', res.userId);
    await this.storage.set('boti_token', res.keyToken);

    if(res.parentId){
      await this.storage.set('boti_parentId', res.parentId);
      this.parent = res.parentId;
      
      let activeeleve = await this.storage.get('boti_activeEleve');
      if(!activeeleve){
        await this.storage.set('boti_activeEleve', res.eleveId);
        this.active_eleve = res.eleveId;
      }else
      this.active_eleve = activeeleve;
      

    }

    if(res.eleveId){
      await this.storage.set('boti_eleveId', res.eleveId);
      this.eleve = res.eleveId;
      if(!this.parent)
      this.parent = res.parent_id;
    }
    
    if(res.enseignantId){
      await this.storage.set('boti_enseignantId', res.enseignantId);
      this.enseignant = res.enseignantId;
    }
    
    if(res.pickId){
      await this.storage.set('boti_pickId', res.pickId);
      this.pick = res.pickId;
    }
    
    if(res.pointageId){
      await this.storage.set('boti_pointageId', res.pointageId);
      this.pointage = res.pointageId;
    }
    
    if(res.adminId){
      await this.storage.set('boti_adminId', res.adminId);
      this.admin = res.adminId;
    }

    this.acces = res._acces;
    return res._acces;
  }

  login(accountInfo: any): Promise<string> {
    return new Promise((resolve,reject) => {
      this.apiservice.post({
        login: accountInfo.login,
        password: accountInfo.password
      }, 'login').subscribe(async (res:any)=>{
        if (!res.error) {
          console.log(res)
          resolve(await this.setLoggedIn(res));
        } else {
          reject(res.msg)
        }
      });

    })
  }

  async feedProviders(res: any){
    if(res.parentId){
      console.log('comptecheck: parent id '+res.parentId);
      this.parentService.parentId = res.parentId;
      let el = res.eleves.filter((eleve:any)=> eleve.id == this.active_eleve);
      this.parentService.currentEleve = el.length > 0?el[0]:res.eleves[0];
      this.parentService.eleves = res.eleves;
      this.parentService.menu = res.translation.menu;
    }else if(res.eleveId){
      console.log('comptecheck: parent id '+res.parent_id);
      this.parentService.parentId = res.parent_id;
      let el = res.eleves.filter((eleve:any)=> eleve.id == this.active_eleve);
      this.parentService.currentEleve = el.length > 0?el[0]:res.eleves[0];
      this.parentService.eleves = res.eleves;
      this.parentService.menu = res.translation.menu;
    }
  }

  async removeSession(): Promise<void>{
    await this.storage.create();
    await this.storage.remove('boti_user');
    await this.storage.remove('boti_token');
    await this.storage.remove('boti_parentId');
    await this.storage.remove('boti_activeEleve');
    await this.storage.remove('boti_eleveId');
    await this.storage.remove('boti_enseignantId');
    await this.storage.remove('boti_pickId');
    await this.storage.remove('boti_pointageId');
    await this.storage.remove('boti_adminId');

    this.user = null;
    this.token = null;
    this.parent = null;
    this.active_eleve = null;
    this.eleve = null;
    this.enseignant = null;
    this.pick = null;
    this.pointage = null;
    this.admin = null;
    this.acces = null;
   
  }

  async logout(): Promise<void>{
    await this.removeSession();
    this.navCtrl.navigateRoot(['/']);
  }

  goToHome(acces: string = ''){
    if(!acces||acces==''){
      acces = this.acces;
    }
    switch (acces) {
      case 'parent':
        this.navCtrl.navigateRoot(['/parent']);
        break;
      case 'enseignant':
        this.navCtrl.navigateRoot(['/enseignant']);
        break;
      case 'pick':
        this.navCtrl.navigateRoot(['/pick']);
        break;
      case 'eleve':
        this.navCtrl.navigateRoot(['/eleve']);
        break;
      case 'pointage':
        this.navCtrl.navigateRoot(['/pointage']);
        break;
      case 'admin':
        this.navCtrl.navigateRoot(['/admin']);
        break;
      default:
        this.logout();
        break;
    }
  }

}
