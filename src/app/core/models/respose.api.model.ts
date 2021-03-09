import { Character } from './character.model';

export interface ResponseApi {
  code: number;
  message: string;
  error: string[];
  data: string[];
}
