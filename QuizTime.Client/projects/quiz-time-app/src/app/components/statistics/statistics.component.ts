import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { Result } from '../result/models/result';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnDestroy {

  private readonly quizResultLabels = ['Correct', 'Wrong'];
  private readonly quizChartType = 'pie';
  private readonly quizResultColors: { backgroundColor: string[]; }[] = [{
    backgroundColor: ['rgba(54, 136, 231, 0.5)', 'rgba(233, 51, 70, 0.5)']
  }];

  public categoryResultsChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public readonly quizCategoryLabels = ['Animals', 'Art', 'Computer Science', 'Food', 'Geography', 'History', 'Movies', 'Pop Culture', 'Technology', 'Sports'];
  public readonly quizCategoryResultsChartType = 'bar';
  public readonly quizResultsLegend = true;
  public readonly resultsByCategoryDatasets: { data: number[], label: string }[] = [
    { data: [], label: 'Wrong' },
    { data: [], label: 'Correct' }
  ];

  private readonly subscription: Subscription = new Subscription();

  public quizResults: Result[] = [];

  constructor(private quizService: QuizService) {
    this.subscription.add(this.quizService.getResults()
      .subscribe((results: number[][]) => {
        if (results.length) {
          results.forEach((singleResult: number[]) => {
            const correctAnswers: number[] = singleResult.filter((value: number) => value > 0);
            const wrongAnswers: number[] = singleResult.filter((value: number) => value <= 0);
            const answers = [correctAnswers.length, wrongAnswers.length]
            const result = new Result(this.quizResultLabels, answers, this.quizChartType, this.quizResultColors)
            this.quizResults.push(result);
          });
        }
      }));
    this.subscription.add(this.quizService.getResultsByCategory().subscribe((resultsByCategory) => {
      this.resultsByCategoryDatasets[0].data = resultsByCategory[0];
      this.resultsByCategoryDatasets[1].data = resultsByCategory[1];
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
