import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Question } from '../common/models/question';
import { environment } from '../../environments/environment';

const Questions: Question[] = [
  {
    isAnswered: false, id: 1, content: 'My First Question', answer: 'My First Answer', category: 'Arts',
    possibleAnswers: [
      'answer1', 'answer2', 'answer3', 'My First Answer'
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnDestroy {

  private readonly secondsPerQestion: number = 45;
  private readonly questions$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(Questions);
  private readonly currentQuestion$$: BehaviorSubject<Question> = new BehaviorSubject<Question>(null);
  private readonly areAllQuestionsAnswered$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly questionTimeLeft$$: BehaviorSubject<number> = new BehaviorSubject<number>(this.secondsPerQestion);
  private readonly subscription: Subscription = new Subscription();
  private readonly skipIncrementValue: number = 5;
  private skip = 0;
  private interval;

  constructor(private httpClient: HttpClient) {
    this.subscription.add(
      this.httpClient.get(environment.apiUrl)
        .subscribe((questions: Question[]) => {
          this.questions$$.next(questions);
          this.currentQuestion$$.next(this.questions$$.value[0]);
        })
    );
  }

  setCurrentQuestion(question: Question): void {
    this.currentQuestion$$.next(question);
  }

  getCurrentQuestion(): Observable<Question> {
    this.startQuestionTimer();
    return this.currentQuestion$$.asObservable();
  }

  getQuestions(): Observable<Question[]> {
    if (this.skip > 0) {
      this.httpClient.get(`${environment.apiUrl}?skip=${this.skip}`)
        .subscribe((questions: Question[]) => {
          if (questions.length) {
            this.questions$$.next(questions);
            this.currentQuestion$$.next(this.questions$$.value[0]);
          } else {
            this.areAllQuestionsAnswered$$.next(true);
          }
        });
    }
    return this.questions$$.asObservable();
  }

  getCurrentQuestionTImer(): Observable<number> {
    return this.questionTimeLeft$$.asObservable();
  }

  moveToNextQuestion(): void {
    let index = this.questions$$.value.indexOf(this.currentQuestion$$.value);

    if (index < this.questions$$.value.length) {
      index += 1;
      this.currentQuestion$$.next(this.questions$$.value[index]);
    }
    this.startQuestionTimer();
  }

  isLastQuestion(): boolean {
    const questionIndex = this.questions$$.value.indexOf(this.currentQuestion$$.value);

    return questionIndex === this.questions$$.value.length - 1;
  }

  areAllQuestionsAnswered(): Observable<boolean> {
    return this.areAllQuestionsAnswered$$.asObservable();
  }

  disposeOfQuestions(): void {
    this.questions$$.next([]);
    this.skip += this.skipIncrementValue;
  }

  startQuestionTimer(): void {
    // the interval must be cleared on each call because
    // this method is called from multiple places
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.currentQuestion$$.value.isAnswered && this.questionTimeLeft$$.value > 0) {
        let currentValue: number = this.questionTimeLeft$$.value;
        currentValue--;
        this.questionTimeLeft$$.next(currentValue);
      } else {
        clearInterval(this.interval);
        this.currentQuestion$$.value.isAnswered = true;
        this.questionTimeLeft$$.next(this.secondsPerQestion);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.questions$$.unsubscribe();
    this.currentQuestion$$.unsubscribe();
  }
}
