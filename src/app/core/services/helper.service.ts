import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  createLoading(message?): Promise<any> {
    return this.loadingCtrl.create({
      message: message ? message : 'Cargando...',
    });
  }

  async createCustomAlert(msg, type?, buttons?, header?, fields?) {
    const alert = await this.alertCtrl.create({
      header: header ? header : '',
      message:
        type === 'Error'
          ? this.addAlertIcon('close-circle', 'danger', msg)
          : type === 'Warning'
          ? this.addAlertIcon('warning', 'warning', msg)
          : type === 'Success'
          ? this.addAlertIcon('checkmark-circle', 'success', msg)
          : '',
      inputs: fields ? fields : [],
      buttons: buttons
        ? buttons
        : [
            {
              text: 'Ok',
              cssClass: 'buttonConfirm',
              handler: () => console.log('Ok'),
            },
          ],
    });
    alert.present();
  }

  private addAlertIcon(nameIcon, cssClass, msg): string {
    return (
      '<ion-grid>' +
      `<ion-row><ion-col class="ion-text-center"><ion-icon name="${nameIcon}" class="${cssClass}"></ion-icon><ion-col></ion-row>` +
      `<ion-row><ion-col class="ion-text-center"><ion-text>${msg}</ion-text><ion-col></ion-row>` +
      '</ion-grid>'
    );
  }

  getErrorMessages(errors: string[]) {
    let error = '';
    errors.forEach((e) => (error += `\n${e}`));
    return error;
  }
}
