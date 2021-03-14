import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { Question } from '../common/models/question';
import { environment } from '../../environments/environment';

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
    const secondsPerQuestion = 45;

    service.getCurrentQuestionTImer().subscribe(result => expect(result).toEqual(secondsPerQuestion));
  });

  it('should make http call', () => {
    const questionsRequest = httpMock.expectOne(environment.apiUrl);
    expect(questionsRequest).toBeDefined();
    httpMock.verify();
  });

  it('should make http call with skip', () => {
    const skipValue = 5;
    httpMock.expectOne(environment.apiUrl);
    service.disposeOfQuestions();

    service.getQuestions().subscribe(result => expect(result.length).toBe(0));
    const questionsRequestWithSkip = httpMock.expectOne(`${environment.apiUrl}?skip=${skipValue}`);

    expect(questionsRequestWithSkip).toBeDefined();
    httpMock.verify();
  });

});
