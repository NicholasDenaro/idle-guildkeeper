import { Type } from "@angular/core";
import { AngularEntity, AngularPainter } from "game-engine-angular";

export abstract class BoundEntity extends AngularEntity {

  private templ: Type<any>;
  private templKey: string;
  constructor(template: Type<any>, key: string) {
    super(template, key);
    this.templ = template;
    this.templKey = key;
  }

  bind(obj: any) {
    Object.keys(this).forEach((key: string) => {
      Reflect.getMetadataKeys(this, key).forEach(meta => {
        if (meta === 'custom:annotations:bound') {
          Reflect.set(obj, key, Reflect.get(this, key));
        }
      });
    });
  }

  setViewKey(key: string) {
    this.templKey = key;
    this.painter = new AngularPainter(this.templ, this.key);
    (this.painter as AngularPainter).init(this);
  }

  setViewTemplate(template: Type<any>) {
    this.templ = template;
    this.painter = new AngularPainter(this.templ, this.key);
    (this.painter as AngularPainter).init(this);
  }
}

export function Bound(target: Object, propertyKey: string | symbol) {
  Reflect.defineMetadata('custom:annotations:bound', 'bound', target, propertyKey);
}