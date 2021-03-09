import { Injectable } from '@angular/core';
import { EndPoint } from './app.settings.model';

@Injectable()
export class AppSettings {
  public processText = {
    proccess: EndPoint.uri('characters'),
  };
}
