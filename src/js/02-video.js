import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);
const localStorageKey = 'videoplayer-current-time';

const currentTime = throttle(data => {
  localStorage.setItem(localStorageKey, data.seconds);
}, 1000);

player.on('timeupdate', currentTime);

const storedTime = localStorage.getItem(localStorageKey);

if (storedTime) {
  player
    .setCurrentTime(parseFloat(storedTime))
    .then(function (seconds) {
      console.log('Seeked to:', seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.error(
            'The time was less than 0 or greater than the video’s duration.'
          );
          break;

        default:
          console.error('Some other error occurred:', error);
          break;
      }
    });
}
