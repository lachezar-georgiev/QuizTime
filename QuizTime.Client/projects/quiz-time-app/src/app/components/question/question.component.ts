import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../common/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: Question;
  public isRadioButtonChecked: boolean = false;

  @Input()
  public questionScore: boolean;

  public currentSelectedAnswer: string;

  public isModalVisible: boolean = false;

  public questionIds: string[] = ['A', 'B', 'C', 'D'];

  constructor() { }

  ngOnInit(): void {
  }

  onCompleteQuestion() {
    if(this.isModalVisible) {
      this.isModalVisible = !this.isModalVisible;
    }
    this.question.isAnswered = true;
    this.isRadioButtonChecked = false;
  }

  onInput(currentSelectedAnswer: string) {
    this.isRadioButtonChecked = true;
    this.currentSelectedAnswer = currentSelectedAnswer;
  }

  checkIfAnswerIsValid():boolean {
    console.log(this.currentSelectedAnswer === this.question.answer);
    return this.currentSelectedAnswer === this.question.answer;
  }

  toggleModal() {
    if(this.isRadioButtonChecked) {
      this.isModalVisible = !this.isModalVisible;
    } 
  }

}
