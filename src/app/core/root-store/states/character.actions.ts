import { Character } from '@coreapp/models/character.model';

export class SetText {
  static readonly type = '[Chain] set text';
  constructor(public text: string) {}
}

export class SetTextList {
  static readonly type = '[Chain] set text list';
  constructor(public textList: string[]) {}
}

export class ProcessText {
  static readonly type = '[Chain] process text';
  constructor(public chain: Character) {}
}
