import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnDestroy {
  public readonly results$: Observable<number[]>;

  private readonly quizInProgress$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly results$$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private results: number[] = [];

  constructor() {
        this.results$ = this.results$$.asObservable();
  }

  startQuiz(): void {
    this.quizInProgress$$.next(true);
  }

  finishQuiz(): void {
    this.quizInProgress$$.next(false);
  }

  isQuizInProgress(): Observable<boolean> {
    return this.quizInProgress$$.asObservable();
  }

  addResult(result: number): void {
    this.results.push(result);
    this.results$$.next([...this.results]);
  }

  getResults(): Observable<number[]> {
    return this.results$$.asObservable();
  }

  ngOnDestroy(): void {
    this.results$$.unsubscribe();
  }
}
