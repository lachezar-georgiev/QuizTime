import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../common/models/question';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  currentQuestion: Observable<Question>;

  constructor(
    private questionService: QuestionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentQuestion = this.questionService.getCurrentQuestion();
  }

  onNextQuestion(){
    if (!this.questionService.isLastQuestion()) {
      this.questionService.moveToNextQuestion();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.questionService.isLastQuestion() ? 'Next Question' : 'Finish';
  }

  onSubmit(): void {
    this.router.navigate(['/home']);
  }
}
