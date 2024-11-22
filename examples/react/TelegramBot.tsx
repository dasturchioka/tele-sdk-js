import React, { useState, useRef, useCallback } from 'react';
import { TelegramBot } from 'tele-sdk-js';

// Initialize bot instance
const bot = new TelegramBot('YOUR_BOT_TOKEN');
const CHAT_ID = 'YOUR_CHAT_ID';

interface Message {
  id: number;
  text: string;
  type: 'text' | 'location' | 'file';
}

const TelegramBotComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Send text message
  const sendMessage = useCallback(async () => {
    if (!messageText.trim()) return;

    try {
      await bot.sendMessage({
        chat_id: CHAT_ID,
        text: messageText,
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: messageText,
        type: 'text'
      }]);

      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [messageText]);

  // Share location
  const shareLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await bot.sendLocation({
          chat_id: CHAT_ID,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setMessages(prev => [...prev, {
          id: Date.now(),
          text: '📍 Location shared',
          type: 'location'
        }]);
      });
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  }, []);

  // Send file
  const sendFile = useCallback(async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    try {
      await bot.sendDocument({
        chat_id: CHAT_ID,
        document: file,
        caption: `Sending file: ${file.name}`,
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `📎 File sent: ${file.name}`,
        type: 'file'
      }]);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending file:', error);
    }
  }, []);

  // Create poll
  const createPoll = useCallback(async () => {
    try {
      await bot.sendPoll({
        chat_id: CHAT_ID,
        question: 'How would you rate this bot?',
        options: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
        is_anonymous: false,
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '📊 Poll created',
        type: 'text'
      }]);
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  }, []);

  return (
    <div className="telegram-bot">
      <div className="messages" ref={messagesContainerRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="controls">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={shareLocation}>Share Location</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={() => sendFile()}
        />
        <button onClick={() => fileInputRef.current?.click()}>
          Upload File
        </button>
        <button onClick={createPoll}>Create Poll</button>
      </div>

      <style jsx>{`
        .telegram-bot {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .messages {
          height: 400px;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 8px;
        }

        .message {
          background-color: #f0f2f5;
          padding: 8px 12px;
          margin: 8px 0;
          border-radius: 8px;
          max-width: 80%;
        }

        .message.location {
          background-color: #e3f2fd;
        }

        .message.file {
          background-color: #e8f5e9;
        }

        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        input[type="text"] {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 8px 16px;
          background-color: #0088cc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #006699;
        }
      `}</style>
    </div>
  );
};

export default TelegramBotComponent;
