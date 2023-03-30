import { Component, OnInit } from '@angular/core';
import { GuildEntity } from 'src/entities/guild.entity';
import { BoundView } from 'src/utils/bound-view';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent extends BoundView implements OnInit {
  day: number = 1;
  time: number = 0;
  gold: number = 0;
  alignment: number = 0;
  specialization: string = '';
  adventurerSlots: number = 0;
  boardSlots: number = 0;
  reputation: number = 0;
  quests: number = 0;
  adventurers: number = 0;
  Arr = Array;
  tab: string = 'Guild';

  override ngOnInit() {
    super.ngOnInit();
    const guild = this.entityAs<GuildEntity>();
    this.adventurers = guild.numberOfAdventurers();
    this.quests = guild.numberOfIncompleteQuests();
  }

  selectTab(tab: string) {
    const guild = this.entityAs<GuildEntity>();
    guild.tab = tab;
    this.tab = tab;
  }
}
