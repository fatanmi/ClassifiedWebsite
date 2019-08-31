import { NormalizedNames } from './normalized-names';
import { Headers2 } from './headers2';

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate?: any;
  headers: Headers2;
}
