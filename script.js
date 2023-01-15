import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

//chatAI loading

function loader(e) {
  e.textContent = '';

  loadInterval = setInterval(() => {
    e.textContent += '.';
    //if loading indicator reaches three dots reset it
    if (e.textContent === '....') {
      e.textContent = '';
    }
  }, 300);
}

//typing function

function typeText(e, text) {
  let index = 0;

  let interval = setInterval(() => {
    //if we are still typing

    if (index < text.length) {
      //AI will check the character and will return the specific index
      e.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//generate unique id of each messages

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
