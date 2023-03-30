import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { QuestEntity, Reward } from 'src/entities/quest.entity';
import { BoundView } from 'src/utils/bound-view';
import { fromTime } from 'src/utils/time';
import { EngineService } from '../engine.service';

@Component({
  selector: 'app-quest-card',
  templateUrl: './quest-card.component.html',
  styleUrls: ['./quest-card.component.less']
})
export class QuestCardComponent extends BoundView implements OnInit {

  name: string = '';
  level: number = 0;
  location: string = '';
  reward: Reward = {};
  task: string = '';
  quantity: number = 0;
  status: number = 0;
  due: number = 0;
  dueTime: number = 0;
  dueHour: string = '00';
  dueMinute: string = '00';
  accepted: boolean = false;
  complete: boolean = false;
  started: boolean = false;

  holding: boolean = false;

  x = 0;
  y = 0;

  constructor(private engineService: EngineService, eref: ElementRef) {
    super(eref);
  }

  override ngOnInit() {
    super.ngOnInit();
    [this.dueHour, this.dueMinute] = fromTime(this.dueTime);
    if (this.holding) {
      this.nativeElement.style.position = 'absolute';
      this.nativeElement.style.top = `${this.y}px`;
      this.nativeElement.style.left = `${this.x}px`;
      this.nativeElement.style.pointerEvents = 'none';
      this.entityAs<QuestEntity>().x = this.x;
      this.entityAs<QuestEntity>().y = this.y;
    }
  }

  accept() {
    const quest = this.entityAs<QuestEntity>();
    if (this.engineService.guild.acceptQuest(quest)) {
      this.engineService.engine.draw();
    }
  }

  reject() {
    this.entityAs<QuestEntity>().reject();
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent) {
    this.x = event.clientX - event.offsetX;
    this.y = event.clientY - event.offsetY;
    this.nativeElement.style.position = 'absolute';
    this.nativeElement.style.top = `${this.y}px`;
    this.nativeElement.style.left = `${this.x}px`;
    this.nativeElement.style.pointerEvents = 'none';
    this.holding = true;
    this.entityAs<QuestEntity>().holding = true;
  }

  @HostListener('window:mouseup', ['$event']) 
  mouseUp(event: MouseEvent) {
    this.nativeElement.style.position = '';
    this.nativeElement.style.pointerEvents = '';
    if (event.target instanceof HTMLDivElement) {
      if (event.target.classList.contains('quest-slot')) {
        if (this.holding){
          if (!this.accepted) {
            this.accept();
          }
        }
      }
    }

    this.holding = false;
    this.entityAs<QuestEntity>().holding = false;
  }

  @HostListener('window:mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    if (this.holding) {
      this.x += event.movementX;
      this.y += event.movementY;
      this.entityAs<QuestEntity>().x = this.x;
      this.entityAs<QuestEntity>().y = this.y;
      this.nativeElement.style.top = `${this.y}px`;
      this.nativeElement.style.left = `${this.x}px`;
    }
  }
}
