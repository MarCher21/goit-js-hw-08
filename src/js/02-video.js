import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const timeProgress = localStorage.getItem('videoplayer-current-time');

function saveTimeProgress(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

if (timeProgress) {
  player.setCurrentTime(timeProgress);
}

player.on('timeupdate', throttle(saveTimeProgress, 1000));