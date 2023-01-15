import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

//chatio loading

function loader(e) {
  e.textContent = '';

  loadInterval = setInterval(() => {
    e.textContent += '.';

    if (e.textContent === '....') {
      e.textContent = '';
    }
  }, 300);
}
