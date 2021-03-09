import { Injectable } from '@angular/core';
import { ResponseApi } from '@coreapp/models/respose.api.model';
import { CharacterService } from '@coreapp/services/character.service';
import { Helper } from '@coreapp/services/helper.service';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { finalize } from 'rxjs/internal/operators';

import {
  ICharcaterStateModel,
  defaults,
} from '../state-models/character.state.model';
import * as actions from './character.actions';

@State<ICharcaterStateModel>({
  name: 'testMS_character',
  defaults,
})
@Injectable()
export class CharacterState {
  constructor(
    private store: Store,
    private service: CharacterService,
    private helper: Helper
  ) {}

  @Selector()
  static getTextList(state: ICharcaterStateModel): string[] {
    return state.textList;
  }

  @Action(actions.SetText)
  setText(ctx: StateContext<ICharcaterStateModel>, act: actions.SetText) {
    ctx.patchState({
      text: act.text,
    });
  }

  @Action(actions.SetTextList)
  setTextList(
    ctx: StateContext<ICharcaterStateModel>,
    act: actions.SetTextList
  ) {
    ctx.patchState({
      textList: act.textList,
    });
  }

  @Action(actions.ProcessText)
  async addPost(
    ctx: StateContext<ICharcaterStateModel>,
    act: actions.ProcessText
  ) {
    const loading = await this.helper.createLoading();
    loading.present();
    this.service
      .processText(act.chain)
      .pipe(finalize(async () => await loading.dismiss()))
      .subscribe(
        (resp: ResponseApi) => {
          this.helper.createCustomAlert(resp.message, 'Success');
          this.store.dispatch(new actions.SetTextList(resp.data));
        },
        (err) => {
          this.store.dispatch(new actions.SetTextList(undefined));
          const respErr: ResponseApi = err.error;
          if (respErr.error) {
            const messageError = this.helper.getErrorMessages(respErr.error);
            this.helper.createCustomAlert(messageError, 'Error');
          } else {
            this.helper.createCustomAlert('Error', 'Error');
          }
        }
      );
  }
}
