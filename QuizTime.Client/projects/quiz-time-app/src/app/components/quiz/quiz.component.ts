import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Question } from '../../common/models/question';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public currentQuestion: Observable<Question>;
  public quizInProgress: boolean;
  public isModalVisible: boolean;

  private readonly subscription: Subscription = new Subscription();

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router) { 
      this.subscription.add(this.quizService.quizInProgress$
          .subscribe((quizInProgress: boolean) => this.quizInProgress = quizInProgress));
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      if(!this.quizInProgress) {
        this.quizService.startQuiz();
      } else {
        this.isModalVisible = true;
      }
    }

  ngOnInit(): void {
    this.currentQuestion = this.questionService.getCurrentQuestion();
  }

  onNextQuestion(){
    if (!this.questionService.isLastQuestion()) {
      this.questionService.moveToNextQuestion();
    } else {
      this.finishQuiz();
    }
  }

  showButtonLabel() {
    return !this.questionService.isLastQuestion() ? 'Next Question' : 'Finish';
  }

  finishQuiz(): void {
    this.quizService.finishQuiz();
    this.router.navigate(['/home']);
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  addQuestionResult(questionResult: boolean) {
    this.quizService.addResult(questionResult);
  }
}
