import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromTime } from 'src/utils/time';
import { EngineService } from '../engine.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input()
  day: number = 0;
  @Input()
  time: number = 0;
  @Input()
  gold: number = 0;
  @Input()
  alignment: number = 0;
  @Input()
  specialization: string = '';
  @Input()
  adventurerSlots: number = 0;
  @Input()
  reputation: number = 0;
  @Input()
  boardSlots: number = 0;
  @Input()
  adventurers: number = 0;
  @Input()
  quests: number = 0;

  tabs = [
    'Guild',
    'Upgrades',
    'Recruit'
  ]

  @Input()
  tab: string = this.tabs[0];

  running: boolean = false;

  hour: string = '00';
  minute: string = '00';

  constructor(private engineService: EngineService, private cdr: ChangeDetectorRef) {
    this.running = engineService.running;
  }

  @Output()
  tabSelected = new EventEmitter<string>();

  ngOnInit() {
    [ this.hour, this.minute ] = fromTime(this.time);
  }

  selectTab(tab: string) {
    this.tabSelected.emit(tab);
    this.engineService.engine.draw();
  }

  resume() {
    this.engineService.start();
    this.running = true;
  }

  pause() {
    this.engineService.stop();
    this.running = false;
  }
}
