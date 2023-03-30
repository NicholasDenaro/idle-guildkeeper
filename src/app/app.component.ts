import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { Scene } from 'game-engine';
import { AngularView, GameView } from 'game-engine-angular';
import { AdventurerEntity } from 'src/entities/adventurer.entity';
import { GuildEntity } from 'src/entities/guild.entity';
import { QuestEntity } from 'src/entities/quest.entity';
import { CycleEngine } from 'src/utils/cycle-engine';
import { toTime } from 'src/utils/time';
import { EngineService } from './engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends GameView implements AfterViewInit {
  title = 'idle-guildkeeper';
  static engine: CycleEngine;
  static engineService: EngineService;
  private view?: AngularView;

  constructor(private engineService: EngineService, private ngZone: NgZone, private cdr: ChangeDetectorRef, private eref: ElementRef) {
    super(eref);
    AppComponent.engine = new CycleEngine(1);
    this.engineService.engine = AppComponent.engine;
    AppComponent.engineService = this.engineService;
    this.engineService.guild = new GuildEntity();

    AppComponent.engineService.start();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.view = new AngularView(this, this.ngZone, this.cdr);
    this.initGame();
  }

  initGame() {
    if (this.view) {
      this.view.setViewContainerRef(this.vcrs);
      const ge = this.engineService.guild;
      const scene = new Scene(this.view);
      ge.addAdventurer(new AdventurerEntity('Benjamin'));
      ge.addAdventurer(new AdventurerEntity('Abigail'));
      let quest;
      ge.addRequest(quest = new QuestEntity({task: 'Harvest wood', level: 0, location: 'Forest', quantity: 10, travelTime: toTime(2, 0), due: 2, dueTime: toTime(11, 0), reward:{ gold: 5, experience: 5 }, probability: 0.8}));
      quest.accept();
      // ge.addRequest(quest = new QuestEntity({ task: 'Explore', level: 1, location: 'Forest', quantity: 10, travelTime: toTime(2, 0), due: 2, dueTime: toTime(18, 0), reward: { gold: 0, experience: 5 }, probability: 0.2 }));
      // quest.accept();
      ge.addRequest(quest = new QuestEntity({ task: 'Patrol', level: 0, location: 'City', quantity: toTime(8, 0), travelTime: toTime(0, 0), due: 2, dueTime: toTime(4, 0), reward: { gold: 10, experience: 5 } }));
      //quest.accept();
      ge.addRequest(quest = new QuestEntity({ task: 'Slay Slimes', level: 1, location: 'Flower Fields', quantity: 5, travelTime: toTime(1, 0), due: 2, dueTime: toTime(15, 0), reward: { gold: 15, experience: 20 } }));
      //quest.accept();
      scene.addEntity(ge);
      scene.activate();
      AppComponent.engine.addScene('main', scene);
    }
  }
}
