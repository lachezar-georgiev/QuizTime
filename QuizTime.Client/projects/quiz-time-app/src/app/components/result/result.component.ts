import { Component, Input } from '@angular/core';
import { Result } from './models/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {

  @Input()
  public result: Result = new Result([], [], '', []);

  @Input()
  public quizNumber: number;

}
