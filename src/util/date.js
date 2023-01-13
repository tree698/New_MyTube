import { format, register } from 'timeago.js';
import koLocal from 'timeago.js/lib/lang/ko';

register('ko', koLocal);

export function formatTime(time, lang = 'en_US') {
  return format(time, lang);
}
