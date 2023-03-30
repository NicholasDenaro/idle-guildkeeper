import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UtilsModule } from 'game-engine-angular';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AdventurerComponent } from './adventurer/adventurer.component';
import { AdventurerCardComponent } from './adventurer-card/adventurer-card.component';
import { HeaderComponent } from './header/header.component';
import { QuestCardComponent } from './quest-card/quest-card.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AdventurerComponent,
    AdventurerCardComponent,
    HeaderComponent,
    QuestCardComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    UtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    
  }
 }

 declare global {
  interface Array<T> {
    shuffle(): T[];
  }
 }

Array.prototype.shuffle = function<T>(this: T[]): T[] {
  let i = this.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
}