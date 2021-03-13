import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { Question } from '../common/models/question';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set current question', () => {
    const question: Question = {
      isAnswered: false, id: 1, content: 'My First Question', answer: 'My First Answer', category: 'Arts',
      possibleAnswers: [
        'answer1', 'answer2', 'answer3', 'My First Answer'
      ]
    };

    service.setCurrentQuestion(question);
    service.getCurrentQuestion().subscribe(result => expect(result).toEqual(question));
  });

  it('should get current question timer', () => {
    service.getCurrentQuestionTImer().subscribe(result => expect(result).toEqual(10));
  });

  it('should make http call', () => {
    const questionsRequest = httpMock.expectOne(`https://localhost:44334/api/Question`);
    expect(questionsRequest).toBeDefined();
    httpMock.verify();
  });

  it('should make http call with skip', () => {
    httpMock.expectOne(`https://localhost:44334/api/Question`);
    service.disposeOfQuestions();
    service.getQuestions().subscribe(result => expect(result.length).toBe(0));
    const questionsRequestWithSkip = httpMock.expectOne(`https://localhost:44334/api/Question?skip=5`);
    expect(questionsRequestWithSkip).toBeDefined();
    httpMock.verify();
  });

});
