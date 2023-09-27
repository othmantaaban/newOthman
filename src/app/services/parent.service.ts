import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  public parentId = null;

  public currentEleve : any = null;

  public eleves: any[] = [];
  
  public menu: any[] = [];

  constructor(
    private nav: NavController,
    private storage: Storage
  ) { }

  async switchEleve(eleve: any){
    this.currentEleve = eleve;
    await this.storage.set('boti_activeEleve',eleve.id);

    await this.nav.navigateRoot(['/blank'])
    await this.nav.navigateRoot(['/parent'])
    console.log(this.currentEleve)
    return true;

  }
}
