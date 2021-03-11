import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../common/models/question';

const Questions: Question[] = [
  {
    "isAnswered": false, "id": 1, "content": "My First Question", "answer": "My First Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "answer3", "My First Answer"
    ]
  },
  {
    "isAnswered": false, "id": 2, "content": "My Second Question", "answer": "My Second Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "My Second Answer", "answer4"
    ]
  },
  {
    "isAnswered": false, "id": 3, "content": "My Third Question", "answer": "My Third Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'answer2', "My Third Answer", "answer4"
    ]
  },
  {
    "isAnswered": false, "id": 4, "content": "My Fourth Question", "answer": "My Fourth Answer", "category": "Arts",
    "possibleAnswers": [
      "My Fourth Answer", 'answer2', "answer3", "answer4"
    ]
  },
  { 
    "isAnswered": false, "id": 5, "content": "My Fifth Question", "answer": "My Fifth Answer", "category": "Arts",
    "possibleAnswers": [
      "answer1", 'My Fifth Answer', "answer3", "answer4"
    ]
  }
]

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(Questions);
  currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(null);

  constructor() {
    this.currentQuestion$.next(this.questions$.value[0]);
  }

  setCurrentQuestion(question: Question): void {
    this.currentQuestion$.next(question);
  }

  getCurrentQuestion(): Observable<Question> {
    return this.currentQuestion$.asObservable();
  }

  getQuestions(): Observable<Question[]> {
    return this.questions$.asObservable();
  }

  moveToNextQuestion(): void {
    const index = this.currentQuestion$.value.id;

    // TODO: Change index to use ID
    if (index < this.questions$.value.length) {
      this.currentQuestion$.next(this.questions$.value[index]);
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestion$.value.id === this.questions$.value.length;
  }
}
