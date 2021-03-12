import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {

  public readonly resultsTotal$: Observable<number[]>;

  private readonly quizInProgress$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly results$$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly resultsTotal$$: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  private results: number[] = [];
  private resultsTotal: number[][] = [];

  constructor() {
        this.resultsTotal$ = this.results$$.asObservable();
  }

  startQuiz(): void {
    this.quizInProgress$$.next(true);
  }

  finishQuiz(): void {
    this.quizInProgress$$.next(false);
    if(this.results$$.value.length) {
      this.resultsTotal.push(this.results$$.value);
    }
    this.results$$.next([]);
    this.resultsTotal$$.next([...this.resultsTotal]);
    this.results = [];
  }

  isQuizInProgress(): Observable<boolean> {
    return this.quizInProgress$$.asObservable();
  }

  addResult(result: number): void {
    this.results.push(result);
    this.results$$.next([...this.results]);
  }

  getResults(): Observable<number[][]> {
    return this.resultsTotal$$.asObservable();
  }

  ngOnDestroy():void {
    this.quizInProgress$$.complete();
    this.results$$.complete();
    this.resultsTotal$$.complete();
  }

}
