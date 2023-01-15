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

  return `id-${timeStamp}-${hexadecimalString}`;
}

//chat stripe

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper" ${isAi && 'ai'}>
    <div class="chat">
    <div class="profile">
    <img src="${isAi ? bot : user}"
     alt="${isAi ? 'bot' : 'user'}
     />
    </div>
    <div class="message" id=${uniqueId}>${value}</div>
    </div>
     </div>
    `;
}

//ai response

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  //chat stripe for user
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  //chat stripe for AI
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, '', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
