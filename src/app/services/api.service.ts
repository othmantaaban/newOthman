import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { ModalController, NavController } from '@ionic/angular';
import { ModalSliderComponent } from '../components/modal-slider/modal-slider.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static loaderHtml: string = `
  <div class="custom-spinner-container">
    <div class="custom-spinner-box">
    <img src="assets/imgs/loading/three-dots.svg" />
    </div>
  </div>`;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
  ) { }

  get(params: any, url: String): Observable<any> {
    const type = 'application/x-www-form-urlencoded; charset=UTF-8';

    const optionRequete = {
      params,
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': type
      })
    };

    return this.http
      .get(apiUrl + url, optionRequete).pipe(
        map((response: any)=>{

          if(response.disconnect){
            return this.navCtrl.navigateRoot(['/']);
          }

          if(response.redirect){
            return this.navCtrl.navigateRoot([response.redirect]);
          }

          if(response.showSLides){
            this.modalCtrl.create({
              component: ModalSliderComponent,
              componentProps:{
                key: response.showSLides
              }
            }).then((modal)=>{
              modal.present();
            });
          }

          return response;
        })
      );
  }

  post(params: any, url: String): Observable<any> {
    const data = new FormData();
    Object.entries(params).forEach(([key, value], index) => {
      if(typeof value == 'object' && value != null){
        try {
          if(Array.isArray(value)){
            console.log('entered is array');
            for (let index = 0; index < value.length; index++) {
              const element = value[index];
              if(typeof element == 'object' && element != null){
                data.append(key, (element.file) as Blob,element.name);
              }else{
                data.append(key, element)
              }
            }
          }else{
            // @ts-ignore: Unreachable code error
            data.append(key, (value.file) as Blob,value.name);
          }
          
        } catch (error) {
          console.log('key :', key)
          console.log('value :',value)
          console.log(error)
        }
      }else
      data.append(key, value as any);
    });
    return this.http
      .post(apiUrl + url, data);
  }


  getBlob(url: string, params: any ,isAbsolute = false): Observable<any> {
    return this.http.get(
      (!isAbsolute ? apiUrl : '') + url, 
      {
        params,
        responseType: 'blob'
      }
      ).pipe(
        map(async (response: any)=>{

          if(response.disconnect){
            return await this.navCtrl.navigateRoot(['/']);
          }

          if(response.redirect){
            return await this.navCtrl.navigateRoot([response.redirect]);
          }

          if(response.showSLides){
            let modal = await this.modalCtrl.create({
              component: ModalSliderComponent
            });
            modal.present();
          }

          return response;
        })
      );
  }

}
