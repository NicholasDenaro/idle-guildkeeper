import { AngularPainter } from "game-engine-angular";
import { QuestCardComponent } from "src/app/quest-card/quest-card.component";
import { Bound, BoundEntity } from "src/utils/bound-entity";
import { AdventurerEntity } from "./adventurer.entity";

export class QuestEntity extends BoundEntity {
  @Bound
  name: string = '';
  @Bound
  location: string = '';
  @Bound
  level: number = 0;
  @Bound
  task: string = '';
  @Bound
  quantity: number = 0;
  @Bound
  status: number = 0;
  @Bound
  due: number = 0;
  @Bound
  dueTime: number = 0;
  @Bound
  started: boolean = false;
  travelTime: number = 0;
  @Bound
  accepted: boolean = false;
  @Bound
  reward: Reward = {};
  @Bound
  complete: boolean = false;
  @Bound
  holding: boolean = false;
  @Bound
  x: number = 0;
  @Bound
  y: number = 0;
  rejected: boolean = false;
  private probability = 1;

  adventurer?: AdventurerEntity;

  constructor(config: {task: string, level: number, location: string, quantity: number, travelTime: number, due?: number, dueTime?: number, reward: Reward, probability?: number}) {
    super(QuestCardComponent, 'requests');
    this.task = config.task;
    this.level = config.level;
    this.location = config.location;
    this.quantity = config.quantity;
    this.travelTime = config.travelTime;
    this.due = config.due || 0;
    this.dueTime = config.dueTime || 0;
    this.reward = config.reward;
    this.probability = config.probability || 1;
  }

  accept() {
    this.accepted = true;
    this.painter = new AngularPainter(QuestCardComponent, 'quests');
    (this.painter as AngularPainter).init(this);
    console.log('quest accepted');
  }

  reject() {
    this.rejected = true;
  }

  start(adventurer: AdventurerEntity) {
    this.adventurer = adventurer;
    this.started = true;
  }

  isDone() {
    return this.status == this.quantity;
  }

  markComplete() {
    this.complete = true;
    this.painter = new AngularPainter(QuestCardComponent, 'complete quests');
    (this.painter as AngularPainter).init(this);
  }

  progress(multiplier: number) {
    if (this.status < this.quantity) {
      if (Math.random() * multiplier < this.probability) {
        this.status++;
      }
    }
  }
}

export class Reward {
  gold?: number;
  experience?: number;
}