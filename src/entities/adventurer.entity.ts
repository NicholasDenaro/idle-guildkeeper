import { Scene } from "game-engine";
import "reflect-metadata";
import { AdventurerCardComponent } from "../app/adventurer-card/adventurer-card.component";
import { Bound, BoundEntity } from "../utils/bound-entity";
import { QuestEntity } from "./quest.entity";

export class AdventurerEntity extends BoundEntity {
  @Bound
  name: string = 'name';
  @Bound
  constitution: number = 10;
  @Bound
  intelligence: number = 10;
  @Bound
  spirit: number = 10;
  @Bound
  strength: number = 10;
  @Bound
  dexterity: number = 10;
  @Bound
  luck: number = 10;
  @Bound
  level: number = 1;
  @Bound
  experience: number = 0;
  @Bound
  personality: Personality = Personality.Normal;
  @Bound
  class: Class = Class.Beginner;
  @Bound
  item: string = 'Sword';
  @Bound
  quest?: QuestEntity;

  skills: string[] = [];

  @Bound
  travelTime: number = 0;
  @Bound
  away: boolean = false;

  constructor(name?: string) {
    super(AdventurerCardComponent, 'adventurers');
    if (name) {
      this.name = name;
    }
  }

  override async tick(scene: Scene): Promise<void> {
    await super.tick(scene);

    if (this.quest) {
      if (this.travelTime >= 0) {
        this.travelTime--;
      }
      else {
        if (this.quest.isDone()) {
          this.travelTime = this.quest.travelTime;
        }
        this.quest.progress(1);
      }
      
    }
  }

  startQuest(quest: QuestEntity) {
    this.quest = quest;
    this.away = true;
    this.travelTime = this.quest.travelTime;
    console.log(`${this.name} took quest ${quest.task}`);
  }
}

export enum Personality {
  Normal = 'Normal',
  Independent = 'Independent',
  Zealous = 'Zealous',
  Charismatic = 'Charismatic',
  Ambivalent = 'Ambivalent',
  Supportive = 'Supportive',
  Pensive = 'Pensive',
  Adventurous = 'Adventurous',
  Ambitious = 'Ambitious',
};

export enum Class {
  Beginner = 'Beginner',
}