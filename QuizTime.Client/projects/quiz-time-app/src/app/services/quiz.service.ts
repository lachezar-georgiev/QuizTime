import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public readonly quizInProgress$: Observable<boolean>;
  public readonly results$: Observable<number[]>;

  private readonly quizInProgress$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly results$$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private results: number[] = [];

  constructor() {
        this.quizInProgress$ = this.quizInProgress$$.asObservable();
        this.results$ = this.results$$.asObservable();
  }

  startQuiz(): void {
    this.quizInProgress$$.next(true);
  }

  finishQuiz(): void {
    this.quizInProgress$$.next(false);
  }

  isQuizInProgress(): Observable<boolean> {
    return this.quizInProgress$;
  }

  addResult(result: number): void {
    this.results.push(result);
    this.results$$.next([...this.results]);
  }

  getResults(): Observable<number[]> {
    return this.results$$.asObservable();
  }
}
