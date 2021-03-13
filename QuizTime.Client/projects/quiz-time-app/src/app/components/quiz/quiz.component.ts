import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class QuizComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();

  public currentQuestion$: Observable<Question>;
  public quizInProgress: boolean;
  public isGameOver: boolean;
  public isModalVisible: boolean;
  public questionCategory: string;

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router) {
      this.subscription.add(this.quizService.isQuizInProgress()
        .subscribe((quizInProgress: boolean) => this.quizInProgress = quizInProgress));

      this.subscription.add(this.questionService.areAllQuestionsAnswered$
        .subscribe((areAllQuestionsAnswered: boolean) => this.isGameOver = areAllQuestionsAnswered));

      this.subscription.add(this.questionService.getCurrentQuestion()
        .subscribe((question: Question) => {
          if (question) {
            this.questionCategory = question.category;
          }
        }));

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      if (!this.quizInProgress) {
        this.quizService.startQuiz();
        this.questionService.getQuestions();
      }
      // else if (this.isGameOver) {
      //   // TODO: Add popup for game over!
      // }
      else {
        this.isModalVisible = true;
      }
  }

  onNextQuestion() {
    if (!this.questionService.isLastQuestion()) {
      this.questionService.moveToNextQuestion();
    } else {
      this.finishQuiz();
    }
  }

  showButtonLabel(): string {
    return !this.questionService.isLastQuestion() ? 'Next Question' : 'Finish';
  }

  finishQuiz(): void {
    this.quizService.finishQuiz();
    this.questionService.disposeOfQuestions();
    this.router.navigate(['/statistics']);
  }

  getFreshQuestions() {
    this.questionService.getQuestions();
  }

  toggleModal(startNewQuiz: boolean) {
    this.isModalVisible = !this.isModalVisible;

    if (startNewQuiz) {
      this.quizService.finishQuiz();
      this.questionService.disposeOfQuestions();
      this.getFreshQuestions();
      this.router.navigate(['/quiz']);
    }
  }

  addQuestionResult(questionResult: number) {
    this.quizService.addResult(questionResult, this.questionCategory);
  }

  ngOnInit(): void {
    this.currentQuestion$ = this.questionService.getCurrentQuestion();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
