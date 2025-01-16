import { SarahAI } from './sarah-ai.js';

    const sarah = new SarahAI();
    const conversationDiv = document.getElementById('conversation');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const restartBtn = document.getElementById('restart-btn');

    function addMessage(speaker, message) {
      const msgDiv = document.createElement('div');
      msgDiv.className = speaker === 'user' ? 'user-msg' : 'sarah-msg';
      msgDiv.textContent = `${speaker === 'user' ? 'You' : 'Sarah'}: ${message}`;
      conversationDiv.appendChild(msgDiv);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    function restartGame() {
      conversationDiv.innerHTML = '';
      sarah = new SarahAI();
      addMessage('sarah', sarah.getRandomGreeting());
    }

    async function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (!userMessage) return;

      addMessage('user', userMessage);
      userInput.value = '';
      userInput.disabled = true;

      const sarahResponse = await sarah.generateResponse(userMessage);
      addMessage('sarah', sarahResponse);

      userInput.disabled = false;
      userInput.focus();
    }

    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserInput();
    });

    restartBtn.addEventListener('click', restartGame);

    // Initial greeting
    addMessage('sarah', sarah.getRandomGreeting());
