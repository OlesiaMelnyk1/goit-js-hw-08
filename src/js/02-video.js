import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';
player.on('timeupdate', throttle(onPlayingTime, 1000));

function onPlayingTime({ seconds }) {
  localStorage.setItem(CURRENT_TIME, JSON.stringify(seconds));
  console.log(seconds);
}

player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
