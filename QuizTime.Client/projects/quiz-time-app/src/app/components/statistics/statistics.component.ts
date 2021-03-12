import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { Result } from '../result/models/result';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnDestroy {

  private readonly piechartLabels = ['Correct', 'Wrong'];
  private readonly pieChartType = 'pie';
  private readonly pieChartColors: { backgroundColor: string[]; }[] = [{
    "backgroundColor" : ['rgba(54, 136, 231, 0.5)', 'rgba(233, 51, 70, 0.5)']
  }];

  private readonly subscription: Subscription = new Subscription();

  public pieCharts: Result[] = [];
  
  constructor(private quizService: QuizService) {
    this.subscription.add(this.quizService.getResults()
    .subscribe((results: number[][]) => {
        if(results.length) {
          results.forEach((singleResult: number[]) => {
            const correctAnswers: number[] = singleResult.filter((value: number) => value > 0 );
            const wrongAnswers: number[] = singleResult.filter((value: number) => value <= 0 );
            const answers = [correctAnswers.length, wrongAnswers.length]
            const result = new Result(this.piechartLabels, answers, this.pieChartType,  this.pieChartColors)
            this.pieCharts.push(result);
          })
        }
    }));
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
