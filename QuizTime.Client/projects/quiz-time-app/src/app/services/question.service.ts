import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Question } from '../common/models/question';

const Questions: Question[] = [
  {
    "isAnswered": false, "id": 1, "content": "My First Question", "answer": "My First Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "answer3", "My First Answer"
    ]
  },
  {
    "isAnswered": false, "id": 2, "content": "My Second Question", "answer": "My Second Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "My Second Answer", "answer4"
    ]
  },
  {
    "isAnswered": false, "id": 3, "content": "My Third Question", "answer": "My Third Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "My Third Answer", "answer4"
    ]
  },
  {
    "isAnswered": false, "id": 4, "content": "My Fourth Question", "answer": "My Fourth Answer", "category": "Arts",
    "possibleAnswers": [
      "My Fourth Answer", 'answer2', "answer3", "answer4"
    ]
  },
  {
    "isAnswered": false, "id": 5, "content": "My Fifth Question", "answer": "My Fifth Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'My Fifth Answer', "answer3", "answer4"
    ]
  }
]

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnDestroy {

  public readonly areAllQuestionsAnswered$: Observable<boolean>;

  questions$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(Questions);
  currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(null);

  
  private readonly areAllQuestionsAnswered$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly subscription: Subscription = new Subscription();
  private readonly skipIncrementValue: number = 5;
  private skip: number = 0;

  constructor(private httpClient: HttpClient) {
    // this.subscription.add(
    //   this.httpClient.get("https://localhost:44334/api/Question")
    //     .subscribe((questions: Question[]) => {
    //       this.questions$$.next(questions)
    //       this.currentQuestion$.next(this.questions$$.value[0]);
    //     })
    // );
      this.currentQuestion$.next(this.questions$$.value[0]);
      this.areAllQuestionsAnswered$ = this.areAllQuestionsAnswered$$.asObservable();
  }

  setCurrentQuestion(question: Question): void {
    this.currentQuestion$.next(question);
  }

  getCurrentQuestion(): Observable<Question> {
    return this.currentQuestion$.asObservable();
  }

  getQuestions(): Observable<Question[]> {
    if (this.skip > 0) {
      this.httpClient.get(`https://localhost:44334/api/Question?skip=${this.skip}`)
        .subscribe((questions: Question[]) => {
          if (questions.length) {
            this.questions$$.next(questions);
            this.currentQuestion$.next(this.questions$$.value[0]);
          } else {
            this.areAllQuestionsAnswered$$.next(true);
          }
        });
    }
    return this.questions$$.asObservable();
  }

  moveToNextQuestion(): void {
    let index = this.questions$$.value.indexOf(this.currentQuestion$.value)

    if (index < this.questions$$.value.length) {
      index += 1;
      this.currentQuestion$.next(this.questions$$.value[index]);
    } else {
    }
  }

  isLastQuestion(): boolean {
      const questionIndex = this.questions$$.value.indexOf(this.currentQuestion$.value)

      return questionIndex === this.questions$$.value.length - 1;
  }

  disposeOfQuestions() {
    this.questions$$.next([]);
    this.skip += this.skipIncrementValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.questions$$.unsubscribe();
    this.currentQuestion$.unsubscribe();
  }
}
