import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__
} from '@angular/core';
import { DataService } from '../Services/data.service';
import { MatHorizontalStepper, MatRadioGroup } from '@angular/material';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions;
  valid = true;
  missing: Array<any> = [];
  btnText = 'Next';
  answers = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  };
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getQuestions().subscribe(data => {
      this.questions = data.questions;
      console.log(this.questions);
    });
  }

  next(stepper: MatHorizontalStepper) {
    console.log('selected ', stepper.selectedIndex);
    if (stepper.selectedIndex == 4) {
      this.isValid();
    }
    if (stepper.selectedIndex == 3) {
      this.btnText = 'Finish!';
    } else if (stepper.selectedIndex != 3) {
      this.btnText = 'Next';
    }
    stepper.next();
  }
  do(answer, q) {
    this.answers[q] = answer.value;
    console.log('asnwers ', this.answers);
  }

  isValid() {
    this.missing = [];
    for (const key in this.answers) {
      if (this.answers.hasOwnProperty(key)) {
        // console.log(key, this.answers[key]);
        if (this.answers[key] === '') {
          this.missing.push(key);
        }
      }
    }
    if (this.missing.length > 0) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }
}
