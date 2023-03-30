import { Component, OnInit } from '@angular/core';
import { QuestEntity } from 'src/entities/quest.entity';
import { BoundView } from 'src/utils/bound-view';

@Component({
  selector: 'app-adventurer-card',
  templateUrl: './adventurer-card.component.html',
  styleUrls: ['./adventurer-card.component.less']
})
export class AdventurerCardComponent extends BoundView implements OnInit {
  public name: string = '';
  public class: string = '';
  public personality: string = '';
  public level: number = 1;
  public experience: number = 0;
  public strength: number = 0;
  public intelligence: number = 0;
  public spirit: number = 0;
  public luck: number = 0;
  public dexterity: number = 0;
  public constitution: number = 0;

  private quest?: QuestEntity;
  public questTask: string = '';
  public hasQuest: boolean = false;
  public questStatus: number = 0;
  public questQuantity: number = 0;

  public travelTime: number = 0;

  override ngOnInit() {
    super.ngOnInit();
    
    if (this.quest) {
      this.hasQuest = true;
      this.questTask = this.quest.task;
      this.questStatus = this.quest.status;
      this.questQuantity = this.quest.quantity;
    }
  }
}
