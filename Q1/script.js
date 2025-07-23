
        let currentChatId = null;
        let isProcessing = false;


        function init() {
         loadHistory();
            setlisteners();

            currentChatId = createNewChat();
        }

      const modelSelect = document.getElementById('modelSelect');
        const currentChatTitle = document.getElementById('currentChatTitle');
        function createNewChat() {
            const chatId = 'chat_' + Date.now();
            const chatTitle = 'New Chat';
            
            const chat = {
                id: chatId,
                title: chatTitle,
                model: modelSelect.value,
                messages: [],
                createdAt: new Date().toISOString()
            };
            
            saveToStorage(chat);
            renderChat(chat);
            currentChatTitle.textContent = chatTitle;
            
            return chatId;
        }   
  
        const historyList = document.getElementById('historyList');
        function loadHistory() {
            historyList.innerHTML = '';
            const chats = getFromStorage();
            
            chats.forEach(chat => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.textContent = chat.title;
                historyItem.dataset.chatId = chat.id;
                
                historyItem.addEventListener('click', () => {
                   
                    document.querySelectorAll('.history-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                   
                    historyItem.classList.add('active');
                    
                    
                    renderChat(chat);
                    currentChatId = chat.id;
                    currentChatTitle.textContent = chat.title;
                });
                
                historyList.appendChild(historyItem);
            });
        }
          const chatContainer = document.getElementById('chatContainer');
    
        function renderChat(chat) {
            chatContainer.innerHTML = '';
            
            chat.messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${message.role}-message`;
                messageElement.textContent = message.content;
                chatContainer.appendChild(messageElement);
            });
            
         
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
  const sendBtn = document.getElementById('sendBtn');
       const messageInput = document.getElementById('messageInput');
        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message || isProcessing) return;
            
            
            isProcessing = true;
            messageInput.disabled = true;
            sendBtn.disabled = true;
            addMessageToChat('user', message);
            messageInput.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;
            try {
                const chat = getChatFromStorage(currentChatId);
                const messages = chat.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));
         const model = modelSelect.value;
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer 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',
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'http://localhost:5500',
                        'X-Title': 'chat bot'
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        stream: true
                    })
                });
const messageElement = document.createElement('div');
messageElement.className = 'message ai-message';
chatContainer.appendChild(messageElement);
const reader = response.body.getReader();
const decoder = new TextDecoder();
let aiResponse = '';
while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') break;
        try {
            const parsed = JSON.parse(message); 
            const content = parsed.choices[0].delta.content;
            if (content) {
                aiResponse += content;
                messageElement.textContent = aiResponse; 
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
    }
}
                addMessageToChat('assistant', aiResponse);
                
            } catch (error) {
                console.error('Error:', error);
                addMessageToChat('assistant', "Sorry,Please try again.");
            } finally {
                isProcessing = false;
                messageInput.disabled = false;
                sendBtn.disabled = false;
                messageInput.focus();
            }
        }
        function addMessageToChat(role, content) {
            const chat = getChatFromStorage(currentChatId);
            const message = {
                id: 'msg_' + Date.now(),
                role: role,
                content: content,
                timestamp: new Date().toISOString()
            };
            chat.messages.push(message);
            if (role === 'user' && chat.title === 'New Chat') {
                const words = content.split(' ');
                const title = words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
                chat.title = title;
                currentChatTitle.textContent = title;
            }
            saveToStorage(chat);
            const messageElement = document.createElement('div');
            messageElement.className = `message ${role}-message`;
            messageElement.textContent = content;
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
         loadHistory();
        }
        function getFromStorage() {
            const chatsJSON = localStorage.getItem('chatHistory');
            return chatsJSON ? JSON.parse(chatsJSON) : [];
        }
        function saveToStorage(chat) {
            const chats = getFromStorage();
            const existingIndex = chats.findIndex(c => c.id === chat.id);
            
            if (existingIndex >= 0) {
                chats[existingIndex] = chat; 
            } else {
                chats.push(chat); 
            }
            
            localStorage.setItem('chatHistory', JSON.stringify(chats));
        }
        function getChatFromStorage(chatId) {
            const chats = getFromStorage();
            return chats.find(chat => chat.id === chatId);
        }
     const newChatBtn = document.querySelector('.new-chat-btn');
        function setlisteners() {
            sendBtn.addEventListener('click', sendMessage);
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            newChatBtn.addEventListener('click', () => {
                currentChatId = createNewChat();
                document.querySelectorAll('.history-item').forEach(item => {
                    item.classList.remove('active');
                });
            })
            modelSelect.addEventListener('change', () => {
                if (currentChatId) {
                    const chat = getChatFromStorage(currentChatId);
                    chat.model = modelSelect.value;
                    saveToStorage(chat);
                }
            });
        }
        document.addEventListener('DOMContentLoaded', init);