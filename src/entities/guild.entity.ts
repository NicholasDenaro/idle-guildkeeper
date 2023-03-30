import { Scene } from "game-engine";
import { AppComponent } from "src/app/app.component";
import { GameComponent } from "src/app/game/game.component";
import { Bound, BoundEntity } from "src/utils/bound-entity";
import { toTime } from "src/utils/time";
import { AdventurerEntity } from "./adventurer.entity";
import { QuestEntity } from "./quest.entity";

export class GuildEntity extends BoundEntity {
  @Bound
  public tab = 'Guild';
  @Bound
  public day = 1;
  @Bound
  public time = toTime(5, 30);
  @Bound
  public gold = 0;
  @Bound
  public alignment: string = 'Neutral';
  @Bound
  public specialization = 'None';
  @Bound
  public adventurerSlots = 10;
  @Bound
  public reputation = 0;
  @Bound
  public boardSlots = 5;

  constructor() {
    super(GameComponent, 'game');
  }

  override async tick(scene: Scene): Promise<void> {
    await super.tick(scene);
    this.time++;
    if (this.time >= 48) {
      this.time = 0;
      this.day++;
    }

    if (this.time === toTime(6, 0)) {
      AppComponent.engineService.stop();
    }


    const requests = this.entities
      .filter(entity => entity instanceof QuestEntity)
      .map(entity => entity as QuestEntity)
      .filter(quest => !quest.accepted);


    if (requests.length == 0 && Math.random() < 0.05) {
      const tasks: { name: string, location: string }[] = [
        { name: 'Slay Slimes', location: 'Flower Fields' },
        { name: 'Slay Wolves', location: 'Flower Fields' },
        { name: 'Collect Herbs', location: 'Flower Fields' },
        { name: 'Harvest Wood', location: 'Flower Fields' },
      ];
      const task = tasks [Math.floor(Math.random() * tasks.length)];
      let exp = 0;
      let gold = 0;
      let quant = 5 + Math.floor(Math.random() * 5);
      if (task.name.startsWith('Slay')) {
        exp = 5 + Math.floor(Math.random() * quant);
        gold = 2 + Math.floor(Math.random() * 4);
      } else {
        exp = 0 + Math.floor(Math.random() * 3);
        gold = 2 + Math.floor(Math.random() * quant);
      }
      this.addRequest(new QuestEntity({
        task: task.name,
        level: 1,
        location: task.location,
        quantity: quant,
        travelTime: 2,
        due: this.day + 2,
        dueTime: toTime(10 + Math.floor(Math.random() * 6), 0),
        reward: {
          gold: gold,
          experience: exp,
        }
      }))
    }

    // Only start quests between 8-11 and 17-19
    if (this.time >= toTime(8, 0) && this.time <= toTime(11, 0) || 
      this.time >= toTime(17, 0) && this.time <= toTime(19, 0)) {
      const availableQuests = this.entities
        .filter(entity => entity instanceof QuestEntity)
        .map(entity => entity as QuestEntity)
        .filter(quest => quest.accepted && !quest.started)
        .shuffle();;

      const availableAdventurers = this.entities
        .filter(entity => entity instanceof AdventurerEntity)
        .map(entity => entity as AdventurerEntity)
        .filter(adventurer => !adventurer.quest)
        .shuffle();

      availableQuests.forEach(quest => {
        let adventurer;
        while (adventurer = availableAdventurers.pop()) {
          adventurer.startQuest(quest);
          quest.start(adventurer);
          break;
        }
      });
    }
    

    const adventurersWithQuests = this.entities
      .filter(entity => entity instanceof AdventurerEntity)
      .map(entity => entity as AdventurerEntity)
      .filter(adventurer => adventurer.quest);

    adventurersWithQuests.forEach(adventurer => {
      const quest = adventurer.quest;
      if (quest?.isDone() && adventurer.travelTime == 0) {
        adventurer.quest = undefined;
        adventurer.experience += quest.reward.experience || 0;
        quest.markComplete();
      }
    });


    this.entities
      .filter(entity => entity instanceof QuestEntity)
      .map(entity => entity as QuestEntity)
      .filter(quest => quest.complete)
      .forEach(quest => {
        if (quest.due == this.day && quest.dueTime == this.time) {
          this.gold += quest.reward.gold || 0;
          this.removeQuest(quest);
        }
      })

  }

  numberOfAdventurers() {
    return this.entities.filter(entity => entity instanceof AdventurerEntity).length;
  }

  numberOfQuests() {
    return this.entities.filter(entity => entity instanceof QuestEntity && entity.accepted).length;
  }

  numberOfIncompleteQuests() {
    return this.entities.filter(entity => entity instanceof QuestEntity && entity.accepted && !entity.complete).length;
  }

  addAdventurer(adventurer: AdventurerEntity) {
    this.addEntity(adventurer);
  }

  acceptQuest(quest: QuestEntity): boolean {
    if (this.numberOfIncompleteQuests() < this.boardSlots) {
      quest.accept();
      return true;
    }

    return false;
  }

  addRequest(quest: QuestEntity) {
    this.addEntity(quest);
  }

  removeQuest(quest: QuestEntity) {
    this.entities.splice(this.entities.indexOf(quest), 1 );
  }
}