import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Question } from '../../common/models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1500)),
    ])
  ]
})
export class QuestionComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  @Input()
  public question: Question;

  @Input()
  public questionScore: boolean;

  @Output()
  public questionResultChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isRadioButtonChecked = false;
  public currentSelectedAnswer: string;
  public currentCorrectAnswer: string;
  public isModalVisible = false;
  public questionIds: string[] = ['A', 'B', 'C', 'D'];
  public questionTimer: number;


  constructor(private questionService: QuestionService) {
    this.subscription.add(this.questionService.getCurrentQuestion()
      .subscribe((currentQuestion: Question) => {
        if (currentQuestion) {
          this.currentCorrectAnswer = currentQuestion.answer;
        }
      }));
    this.subscription.add(this.questionService.getCurrentQuestionTImer()
      .subscribe((questionTimer: number) => {
        this.questionTimer = questionTimer;
        if (questionTimer === 0 && !this.question.isAnswered) {
          this.markQuestionAsWrong();
        }
      }));
  }

  onCompleteQuestion(): void {
    if (this.isModalVisible) {
      this.isModalVisible = !this.isModalVisible;
    }

    if (this.currentSelectedAnswer.toLowerCase() === this.currentCorrectAnswer.toLowerCase()) {
      this.onQuestionResultChanged(true);
    } else {
      this.onQuestionResultChanged(false);
    }

    this.question.isAnswered = true;
    this.isRadioButtonChecked = false;
  }

  onInput(currentSelectedAnswer: string): void {
    this.isRadioButtonChecked = true;
    this.currentSelectedAnswer = currentSelectedAnswer;
  }

  checkIfAnswerIsValid(): boolean {
    return this.currentSelectedAnswer === this.question.answer;
  }

  toggleModal(): void {
    if (this.isRadioButtonChecked) {
      this.isModalVisible = !this.isModalVisible;
    }
  }

  onQuestionResultChanged(questionResult: boolean): void {
    this.questionResultChanged.emit(questionResult);
  }

  markQuestionAsWrong(): void {
    this.onQuestionResultChanged(false);
    this.currentSelectedAnswer = null;
    if (this.isModalVisible) {
      this.isModalVisible = false;
    }
  }

  ngOnInit(): void {
    if (!this.question) {
      this.question = new Question(0, '', '', '', false, ['']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
