import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QuizTime';

  private readonly subscription: Subscription = new Subscription();
  public quizInProgress: boolean;

  constructor(private quizService: QuizService) {
        this.subscription.add(this.quizService.isQuizInProgress()
          .subscribe((quizInProgress: boolean) => this.quizInProgress = quizInProgress));
   }


}
