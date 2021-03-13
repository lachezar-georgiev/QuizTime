import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
    let service: QuizService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(QuizService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start a quiz', () => {
        service.startQuiz();
        service.isQuizInProgress().subscribe(result => expect(result).toBeTrue());
    });

    it('should finish a quiz', () => {
        service.startQuiz();
        service.finishQuiz();
        service.isQuizInProgress().subscribe(result => expect(result).toBeFalse());
    });

    it('should track if quiz is not in progress', () => {
        service.isQuizInProgress().subscribe(result => expect(result).toBeFalse());
    });

    it('should track if quiz is in progress', () => {
        service.startQuiz();
        service.isQuizInProgress().subscribe(result => expect(result).toBeTrue());
    });

    it('should get results', () => {
        service.addResult(1, 'Animals');
        service.addResult(0, 'Movies');
        service.addResult(1, 'ComputerScience');
        service.addResult(1, 'ComputerScience');
        service.addResult(0, 'Art');
        service.finishQuiz();
        service.getResults().subscribe((result) => expect(result[0]).toEqual([1, 0, 1, 1, 0]));
    });

    it('should get results', () => {
        service.addResult(1, 'Animals');
        service.addResult(0, 'Movies');
        service.addResult(1, 'ComputerScience');
        service.addResult(1, 'ComputerScience');
        service.addResult(0, 'Art');
        const correctResults =  [ 0, 1, 0, 0, 0, 0, 1, 0, 0, 0 ];
        const wrongResults =  [ 1, 0, 2, 0, 0, 0, 0, 0, 0, 0 ];
        service.getResultsByCategory().subscribe((result: any) => expect(result[0]).toEqual(correctResults));
        service.getResultsByCategory().subscribe((result: any) => expect(result[1]).toEqual(wrongResults));
    });
});
