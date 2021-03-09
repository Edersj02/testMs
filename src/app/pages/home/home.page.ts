import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import * as actions from '@root-store/states/character.actions';
import { Character } from '@models/character.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textarea = '';
  subSize: number;
  constructor(private store: Store) {}

  processText() {
    console.log('process');

    const chain: Character = {
      chain: this.textarea,
      subSize: this.subSize,
    };

    this.store.dispatch(new actions.ProcessText(chain));
  }
}
