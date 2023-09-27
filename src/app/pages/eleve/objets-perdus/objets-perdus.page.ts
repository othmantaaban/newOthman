import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-objets-perdus',
  templateUrl: './objets-perdus.page.html',
  styleUrls: ['./objets-perdus.page.scss'],
})
export class ObjetsPerdusPage implements OnInit {
  eleve: any;
  loading: any;
  loadingBlur: any;
  _result: any;
  categories: any;
  clothes: any;
  allObjects: any;
  activeCategory: any;
  // @ts-ignore: Unreachable code error
  activeBtn: boolean;
  activeAll: boolean = true;
  activeBtns: any;
  _result_obj: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
  ) { }

  ionViewDidLoad() {
    this.presentLoadingCustom();
  }

  ngOnInit(): void {
    // this.getData();
    this.getTypes();
  }
  getData(): void {
    this.apiSerivce
      .get(
        {
          user_id : this.authservice.user,
          parent_id : this.parentservice.parentId,
          key  : this.authservice.token,
        },
        "compte"
      )
      .subscribe(
        (result) => {
          this._result = result;
          console.log(this._result, "yes");
          this.loading.dismiss();
          this.loadingBlur = null;
        },
        (error) => {
          console.log("Error :: " + error);
          this.loading.dismiss();
        }
      );
  }
  getAllObjects() {
    this.clothes = this.allObjects;
    // ele.classList.add('active-link-all');
    this.activeAll = true;
    this.activeCategory = null;
  }

  getObjectsFiltered(category: any) {
    this.clothes = category.items;
    this.activeCategory = category.id;
    this.activeAll = false;
  }

  setToParent(cloth: any) {
    // const formData = new FormData();
    // formData.append("eleve_id", ApiService.eleveId);
    // formData.append("parent_id", ApiService.parentId);
    // formData.append("user_id", ApiService.userId);
    // formData.append("key", ApiService.keyToken);
    // formData.append("object_id", cloth.id);
    this.apiSerivce.post({
      eleve_id: this.parentservice.currentEleve.id,
      user_id : this.authservice.user,
      parent_id : this.parentservice.parentId,
      key  : this.authservice.token,
      object_id: cloth.id
    }, "objects").subscribe((res) => {
      cloth.isForMe = !cloth.isForMe;
    });
  }
  getTypes() {
    this.apiSerivce
      .get(
        {
          eleve_id: this.parentservice.currentEleve.id,
          user_id : this.authservice.user,
          parent_id : this.parentservice.parentId,
          key  : this.authservice.token,
        },
        "objects"
      )
      .subscribe(
        (results: any) => {
          console.log(results);
          
          this.categories = results.types;
          this.allObjects = results.all_objects;
          this.clothes = this.allObjects;
          this._result_obj = results
          this.loading.dismiss();
          console.log(results);
        },
        (error) => console.log("Error :: " + error)
      );
  }
  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      duration: 10000,
    });
    this.loading.present();
  }

}
