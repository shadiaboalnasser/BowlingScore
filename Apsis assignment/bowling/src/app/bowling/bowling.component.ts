import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IFrame, IScore} from "../data.model";
import {DataService} from "../data.service";

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {

  /*the current frame being edited */
  activeFrame: number;
  /*the bowling scorecard by frames */
  frames: IFrame[] = [];
  /* display error message*/
  outOfRange: boolean;
  isInputs: boolean;

  score: number;

  constructor(private data: DataService) {
    this.frames = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  }

  ngOnInit() {
    this.activeFrame = 0;
    this.outOfRange = false;
    this.isInputs = false;
  }

  onSubmit(form) {
    /* show error if inputs invalid*/
    if (BowlingComponent.validationInputs(form)) this.outOfRange = true;
    /* submit */
    else {
      /*clear error message*/
      this.outOfRange = false;
      /*assign the forms to the active frame*/
      this.frames[this.activeFrame].firstRoll = form.firstRoll;
      this.frames[this.activeFrame].secondRoll = form.secondRoll;
      /* assign the forms to the third roll*/
      if (this.activeFrame === 9) {
        this.frames[this.activeFrame].thirdRoll = form.thirdRoll;
      }
      /*assign second role to 0 if first strike*/
      if (this.frames[this.activeFrame].firstRoll === 10 && this.activeFrame < 9) {
        this.frames[this.activeFrame].secondRoll = 0;
      }
      /*send the frames to backend and receive the score*/
      this.data.postFrames(this.frames).subscribe(result => {
        this.score = result.score;
      });
      /*increment the active frame*/
      this.activeFrame += 1;
    }
  }

  displayValue(frame: IFrame, roll: number): string | number {
    // Show X on final frame when second roll is a strike
    if ((roll === 2 && frame.secondRoll === 10 && this.activeFrame === 9)) return 'X';

    // Determine the character to show (FIRST or SECOND)
    if (roll < 3) {
      // FIRST BOWL : Display a STRIKE character
      if ((frame.firstRoll === 10 && roll === 1) || (frame.secondRoll === 10 && this.activeFrame >= 9 && roll === 2)) {
        return 'X';
      }
      // SECOND BOWL : Display an empty character if a strike occured
      else if ((frame.firstRoll === 10 && this.activeFrame < 9 && roll === 2)) {
        return '';
      }
      // SECOND BOWL : Display a SPARE character
      else if ((frame.firstRoll + frame.secondRoll) === 10 && frame.secondRoll > 0) {
        return (roll === 1) ? frame.firstRoll : '/';
      }
      // OTHERWISE: Show how many pins were hit
      else if (frame.firstRoll < 10 && frame.secondRoll < 10 && (frame.firstRoll + frame.secondRoll) < 10) {
        return roll === 1 ? frame.firstRoll : frame.secondRoll;
      }
    } else {
      // THIRD BOWL
      return (frame.thirdRoll === 10) ? 'X' : frame.thirdRoll;
    }
  }

  static validationInputs(form) {
    return (
      ((form.firstRoll + form.secondRoll) > 10 || (form.firstRoll + form.secondRoll) < 0)
      || (form.firstRoll < 0)
      || (form.secondRoll < 0)
    )
  }
}
