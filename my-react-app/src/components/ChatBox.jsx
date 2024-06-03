import { useState } from 'react';
import axios from 'axios';
import '../styles/ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, sender: 'user' };
      setMessages([...messages, userMessage]);
      setUserInput('');

      const response = await axios.post('YOUR_DIALOGFLOW_ENDPOINT', {
        queryInput: {
          text: {
            text: userInput,
            languageCode: 'en-US'
          }
        }
      }, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`
        }
      });

      const botMessage = { text: response.data.queryResult.fulfillmentText, sender: 'bot' };
      setMessages([...messages, userMessage, botMessage]);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
