import { Injectable } from '@angular/core';
import { Engine } from 'game-engine';
import { GuildEntity } from 'src/entities/guild.entity';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  engine!: Engine;

  guild!: GuildEntity;

  running: boolean = true;

  constructor() { }

  start() {
    this.engine.start();
    this.running = true;
  }

  stop() {
    this.engine.stop();
    this.running = false;
  }
}
