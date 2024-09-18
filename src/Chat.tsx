import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FluentProvider, webLightTheme, Button, Textarea } from '@fluentui/react-components';
import './App.css';

interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage },
    ]);
    setNewMessage('');
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="chat-container">
        <div className="chat-header">Chat header</div>
        <div className="message-list">
          {messages.map(message => (
            <div key={message.id} className="customer-message">
              {message.text}
            </div>
          ))}
        </div>
        <Textarea
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          rows={3}
        />
        <Button className="send-button" onClick={handleSendMessage}>Send</Button>
      </div>
    </FluentProvider>
  );
};

export default Chat;
