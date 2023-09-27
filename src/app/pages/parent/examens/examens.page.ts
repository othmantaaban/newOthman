import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FileService } from 'src/app/services/file.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-examens',
  templateUrl: './examens.page.html',
  styleUrls: ['./examens.page.scss'],
})
export class ExamensPage implements OnInit {

  _result: any;
  eleve:any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private fileservice: FileService,
  ) {
    this.eleve = this.parentservice.currentEleve;

  }

  getData(): void {
    this.apiSerivce.get(
      { 
        user_id : this.authservice.user,
        parent_id : this.parentservice.parentId,
        eleve_id : this.parentservice.currentEleve.id,
        key  : this.authservice.token,
      }, 'examens_v2')
        .subscribe(
            result => { 
              this._result = result;
              console.log(this._result.data[1])
            }
              , 
            error => console.log("Error :: " + error)
        )
  }

  ngOnInit(): void {
      this.getData();
  }

  downloadFile(file:any) {
    this.fileservice.downloadFile(file,null);
  }


}
