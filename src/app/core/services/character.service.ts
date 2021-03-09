import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppSettings } from '@coreapp/app.settings';
import { Character } from '@coreapp/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient, protected urls: AppSettings) {}

  processText(chain: Character) {
    return this.http.post(this.urls.processText.proccess, chain);
  }
}
