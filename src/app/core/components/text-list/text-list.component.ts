import { Component, OnInit } from '@angular/core';
import { CharacterState } from '@coreapp/root-store/states/character.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.scss'],
})
export class TextListComponent implements OnInit {
  @Select(CharacterState.getTextList) list$: Observable<string[]>;
  constructor() {}

  ngOnInit() {}
}
