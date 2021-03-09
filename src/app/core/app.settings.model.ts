import { environment } from '@env/environment';

export class EndPoint {
  static uri(resource: string) {
    return environment.url + resource;
  }

  static uriBase(resource: string) {
    return environment.url_base + resource;
  }

  static isProduction(): boolean {
    return environment.production;
  }
}
