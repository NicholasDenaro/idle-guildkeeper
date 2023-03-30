import { Component, OnInit } from "@angular/core";
import { GameView } from "game-engine-angular";
import { BoundEntity } from "./bound-entity";

@Component({
  template: ''
})
export abstract class BoundView extends GameView implements OnInit {
  ngOnInit(): void {
    this.entityAs<BoundEntity>().bind(this);
  }
}