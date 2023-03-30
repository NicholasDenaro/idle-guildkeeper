import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent implements OnInit {
  @Input()
  public value: number = 0;
  @Input()
  public max: number = 1;
  public barStyle: string = '';

  ngOnInit() {
    const percent = this.value / this.max * 100;
    this.barStyle = `linear-gradient(to right, #12b012 0%, #12b012 ${percent}%, transparent ${percent}%, transparent 100%)`;
  }
}
