import { FixedTickEngine } from "game-engine";

export class CycleEngine extends FixedTickEngine {
  override start(): Promise<void> {
    return super.start();
  }

  override stop(): Promise<void> {
    return super.stop();
  }
}