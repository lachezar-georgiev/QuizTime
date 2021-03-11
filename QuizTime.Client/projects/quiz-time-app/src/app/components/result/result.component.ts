import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public pieChartLabels = ['Correct', 'Wrong'];
  public pieChartData = [];
  public pieChartType = 'pie';
  public colors = [{
    "backgroundColor" : ['rgba(54, 136, 231, 0.5)', 'rgba(233, 51, 70, 0.5)']
  }];

  private readonly subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {
    this.subscription.add(this.quizService.getResults()
    .subscribe((results: number[]) => {
        if(results.length) {
          const correctAnswers: number[] = results.filter((value: number) => value > 0 );
          const wrongAnswers: number[] = results.filter((value: number) => value <= 0 );
          this.pieChartData = [correctAnswers.length, wrongAnswers.length]
        }
    }));
   }

  ngOnInit(): void {

  }

}
