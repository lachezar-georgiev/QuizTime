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
  private readonly resultsByCategory$$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private results: number[] = [];
  private resultsTotal: number[][] = [];
  public endResult = { data: [28, 48, 40, 19, 86, 27, 90], label: 'Wrong' };
  private correctResultsByCategory = {
    animals: 0,
    art: 0,
    computerscience: 0,
    food: 0,
    geography: 0,
    history: 0,
    movies: 0,
    popculture: 0,
    technology: 0,
    sports: 0
  };
  private wrongResultsByCategory = {
    animals: 0,
    art: 0,
    computerscience: 0,
    food: 0,
    geography: 0,
    history: 0,
    movies: 0,
    popculture: 0,
    technology: 0,
    sports: 0
  };

  constructor() {
    this.resultsTotal$ = this.results$$.asObservable();
  }

  startQuiz(): void {
    this.quizInProgress$$.next(true);
  }

  finishQuiz(): void {
    this.quizInProgress$$.next(false);
    if (this.results$$.value.length) {
      this.resultsTotal.push(this.results$$.value);
    }
    this.results$$.next([]);
    this.resultsTotal$$.next([...this.resultsTotal]);
    this.results = [];
  }

  isQuizInProgress(): Observable<boolean> {
    return this.quizInProgress$$.asObservable();
  }

  addResult(result: number, category: string): void {
    this.results.push(result);
    result ? this.correctResultsByCategory[category.toLowerCase()] += 1 :
      this.wrongResultsByCategory[category.toLowerCase()] += 1;

    const correctResults: number[] = [];
    // tslint:disable-next-line: forin
    for (const currentCategory in this.correctResultsByCategory) {
      correctResults.push(this.correctResultsByCategory[currentCategory]);
    }

    const wrongResults: number[] = [];
    // tslint:disable-next-line: forin
    for (const currentCategory in this.wrongResultsByCategory) {
      wrongResults.push(this.wrongResultsByCategory[currentCategory]);
    }

    this.resultsByCategory$$.next([wrongResults, correctResults]);
    this.results$$.next([...this.results]);
  }

  getResults(): Observable<number[][]> {
    return this.resultsTotal$$.asObservable();
  }

  getResultsByCategory(): Observable<[][]> {
    return this.resultsByCategory$$.asObservable();
  }

  ngOnDestroy(): void {
    this.quizInProgress$$.complete();
    this.results$$.complete();
    this.resultsTotal$$.complete();
  }

}
