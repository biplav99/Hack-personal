import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FluentProvider, webLightTheme, Button, Textarea, Field, Avatar } from '@fluentui/react-components';
import './App.css';

interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);

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
    setShowAvatar(true);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="chat-container container">
        <div className='row'>
           <div className="chat-header col-lg-4 col-sm-12 col-xs-12">Chat header</div>
        </div>
        <div className="message-list row">
        {showAvatar && (
          <div className='col-2'> <Avatar name="brand avatar" image={{ src: "../src/assets/att.svg",}}/> </div>
        )}
        <div className='col-10'>
          {messages.map(message => (
            <div key={message.id} className="customer-message">
              {message.text}
            </div>
          ))}
        </div>
        </div> 
          <div className='send-box-wrapper row'>
            <div className='col-10'>
              <Field size="small">
                <Textarea placeholder="Type a message..." value={newMessage} onChange={handleMessageChange}
                  onKeyDown={handleKeyPress} rows={2}/>
              </Field>
            </div>
            <div className='col-1'>
              <Button className="send-button" onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      
    </FluentProvider>
  );
};

export default Chat;
