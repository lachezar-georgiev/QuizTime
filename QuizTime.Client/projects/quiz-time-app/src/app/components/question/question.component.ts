import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from '../../common/models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  @Input()
  public question: Question;

  @Input()
  public questionScore: boolean;

  public isRadioButtonChecked: boolean = false;

  private subscription: Subscription = new Subscription();

  @Output()
  public questionResultChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentSelectedAnswer: string;
  public currentCorrectAnswer: string;

  public isModalVisible: boolean = false;

  public questionIds: string[] = ['A', 'B', 'C', 'D'];

  constructor(private questionService: QuestionService) {
    this.subscription.add(this.questionService.currentQuestion$
      .subscribe((currentQuestion: Question) => {
        // TODO: Double check if this is needed
        if (currentQuestion) {
          this.currentCorrectAnswer = currentQuestion.answer;
        }
      }));
  }

  ngOnInit(): void {
    if (!this.question) {
      this.question = new Question(0, '', '', '', false, ['']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCompleteQuestion() {
    if (this.isModalVisible) {
      this.isModalVisible = !this.isModalVisible;
    }

    if (this.currentSelectedAnswer === this.currentCorrectAnswer) {
      this.onQuestionResultChanged(true);
    } else {
      this.onQuestionResultChanged(false)
    }

    this.question.isAnswered = true;
    this.isRadioButtonChecked = false;
  }

  onInput(currentSelectedAnswer: string) {
    this.isRadioButtonChecked = true;
    this.currentSelectedAnswer = currentSelectedAnswer;
  }

  checkIfAnswerIsValid(): boolean {
    return this.currentSelectedAnswer === this.question.answer;
  }

  toggleModal() {
    if (this.isRadioButtonChecked) {
      this.isModalVisible = !this.isModalVisible;
    }
  }

  onQuestionResultChanged(questionResult: boolean) {
    this.questionResultChanged.emit(questionResult);
  }

}
