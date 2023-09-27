import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  eleve: any;
  _result: any;
  loading: any;
  currentQuestion: any;
  currentQuestionIndex: any;
  countCorrectAnswers: any = 0;
  reponseIndex: any;
  pourcentageQuiz: any = 0;
  textDemarrage: any = {
    show: true,
    pause: false,
    resultat: false,
    button: 'Démarrer le quiz'
  };
  resultatScore: any = {
    score: '',
    time: '',
  };

  timeInSeconds: any;
  remainingTime: any;
  displayTime: any;
  clockTime: any;

  constructor(
    private apiSerivce: ApiService,
    private authservice: AuthService,
    private parentservice: ParentService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) { }

  getData(): void {
    this.apiSerivce.get(
      {
        user_id: this.authservice.user,
        parent_id: this.parentservice.parentId,
        eleve_id: this.parentservice.currentEleve.id,
        key: this.authservice.token,
        matiere_id: this.route.snapshot.queryParamMap.get('matiere_id'),
        quiz_id: this.route.snapshot.queryParamMap.get('quiz_id')
      }, 'ressources_v2')
      .subscribe(
        result => {
          this._result = result;
          this.loading.dismiss();
        }
        ,
        error => console.log("Erreur :: " + error)
      )
  }

  ngOnInit(): void {
    this.getData();
  }

  ionViewDidLoad() {
    this.presentLoadingCustom();
  }

  async presentLoadingCustom() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: ApiService.loaderHtml,
      mode: 'ios',
      duration: 10000
    });
    this.loading.present();
  }


  answerQuestion(reponse: any, i: any) {

    if (this.textDemarrage.pause)
      return false;

    this.textDemarrage.pause = true;

    //Set response
    if (reponse) {
      if (reponse.correct)
        this.countCorrectAnswers++;

      this._result.data.questions[this.currentQuestionIndex].answer.answer = reponse.reponse;
      this.reponseIndex = i;
    }
    this._result.data.questions[this.currentQuestionIndex].answer.answered = this.timeInSeconds - this.remainingTime;

    setTimeout(() => {

      // Go to next Question or finish quiz
      this.currentQuestionIndex++;
      this.textDemarrage.pause = false;
      this.pourcentageQuiz = (((this.currentQuestionIndex) * 100) / this._result.data.questions.length).toFixed(0);
      if (this._result.data.questions[this.currentQuestionIndex]) {

        this.reponseIndex = null;

        this.currentQuestion = this._result.data.questions[this.currentQuestionIndex];

        let remainingTimePrevius = this.remainingTime;
        this.initTimer();
        if (remainingTimePrevius <= 0)
          this.timerTick();
      }
      else {

        this.displayTime = '';

        this.apiSerivce.post({
          quiz_id: this._result.data.quiz_id ,
          questions: JSON.stringify(this._result.data.questions) ,
          eleve_id: this.parentservice.currentEleve.id ,
          user_id: this.authservice.user , 
          parent_id: this.parentservice.parentId ,
          key: this.authservice.token
        }, 'ressources_v2').subscribe(
          result => {

            this.resultatScore = result;

            let thisBind = this
            setTimeout(() => {

              thisBind.reponseIndex = null;

              thisBind.currentQuestion = null;
              thisBind.currentQuestionIndex = 0;

              thisBind.textDemarrage = {
                show: true,
                resultat: true,
                button: 'Reprendre le quiz',
                pause: true
              };

            }, 2000);

          },
          error => {

            //alert(error);
            console.log("Error :: " + error);
            //this.loading.dismiss().catch();
          }
        );

      }

    }, 2000);
    return;
  }


  initTimer() {
    this.timeInSeconds = this.currentQuestion.temps_reponse;
    this.remainingTime = this.currentQuestion.temps_reponse;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.timerTick();
  }

  timerTick() {

    this.clockTime = setTimeout(() => {

      if (this.remainingTime > 0)
        this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.answerQuestion(null, null)
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var minutes = Math.floor((sec_num) / 60);
    var seconds = sec_num - (minutes * 60);
    var minutesString = '';
    var secondsString = '';
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  startQuiz() {

    this.countCorrectAnswers = 0;

    if (this._result && this._result.data.questions) {
      this.currentQuestion = this._result.data.questions[0];
      this.currentQuestionIndex = 0;
    }
    clearTimeout(this.clockTime);
    this.initTimer();
    this.startTimer();

    this.pourcentageQuiz = 0;
    this.textDemarrage.show = false;
    this.textDemarrage.pause = false;
    this.textDemarrage.resultat = false;
  }

}
