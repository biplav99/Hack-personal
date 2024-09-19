import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FluentProvider, webLightTheme, Button, Textarea, Field, Avatar } from '@fluentui/react-components';
import './App.css';
import axios from 'axios';

interface Message {
  id: number;
  text: string;
}
interface ReceivedMsg {
  id: number;
  text: string;
}
let assistant_id= '', thread_id = '';
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiveMsgs, setReceivedMessages] = useState<ReceivedMsg[]>([]);
  const [user_input, setNewMessage] = useState('');
  const [customerResponse, setNewRcvMessage] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {

    if (user_input.trim() === '') return;

    const options = {
     method: 'POST',    
     url: 'https://hackathonstoreapi.azurewebsites.net/api/sendmessage',
      headers: {'Content-Type': 'application/json' },
      data: {
        customer_assistant_id: (assistant_id != '') ? assistant_id : null,
        orchestrator_assistant_id: null,
        orchestrator_thread_id: null,
        customer_thread_id: (thread_id != '') ? thread_id : null,
        user_input: user_input.trim(),
        intents: [],
        intent: '',
        previous_intent: ''
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      setReceivedMessages([...receiveMsgs, {id: Date.now(), text: response.data.customerResponse}]);
      assistant_id = response.data.customer_assistant_id;
      thread_id = response.data.customer_thread_id;
      setNewRcvMessage('');
    }).catch(function (error) {
      console.error(error);
    });

    setMessages([
      ...messages,
      { id: Date.now(), text: user_input },
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
            <div className='col-2'> <Avatar name="brand avatar" image={{ src: "../src/assets/att.svg", }} /> </div>
          )}
          <div className='col-10'>
            {messages.map(message => (
              <div key={message.id} className="customer-message">
                {message.text}
              </div>
            ))}
          </div>
          <div className='col-10'>
            {receiveMsgs.map(receiveMsg => (
              <div key={receiveMsg.id} className="agent-message">
                {receiveMsg.text}
              </div>
            ))}
          </div>
        </div>
        <div className='send-box-wrapper row'>
          <div className='col-10'>
            <Field size="small">
              <Textarea placeholder="Type a message..." value={user_input} onChange={handleMessageChange}
                onKeyDown={handleKeyPress} rows={2} />
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
