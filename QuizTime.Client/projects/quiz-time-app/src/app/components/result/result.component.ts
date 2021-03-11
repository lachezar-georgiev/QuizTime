import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public results;

  private readonly subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {
    this.subscription.add(quizService.getResults()
    .subscribe((results: boolean[]) => {
      this.results = [...results];
    }));
   }

  ngOnInit(): void {
  }

}
