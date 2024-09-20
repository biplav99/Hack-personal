import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FluentProvider, webLightTheme, Button, Textarea, Field, Avatar } from '@fluentui/react-components';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

interface ReceivedMsg {
  id: number;
  text: string;
}
let assistant_id = '', thread_id = '', intents = [], intent = '', orc_assistant_id = '', orc_thread_id = '', previous_intent='';
const Chat: React.FC = () => {

  const [messages, setMessages] = useState<{ id: number; text: string; isCustomer: boolean; timestamp: string}[]>([]);
  const [user_input, setNewMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (user_input.trim() === '') return;

    const newMessage = { id: messages.length + 1, text: user_input, isCustomer: true,timestamp: new Date().toLocaleTimeString() };
    setMessages([...messages, newMessage]);
    setNewMessage('');

    const options = {
      method: 'POST',
      url: 'https://hackathonstoreapi.azurewebsites.net/api/sendmessage',
      headers: { 'Content-Type': 'application/json' },
      data: {
        customer_assistant_id: (assistant_id != '') ? assistant_id : null,
        orchestrator_assistant_id: (assistant_id != '') ? orc_assistant_id : null,
        orchestrator_thread_id: (assistant_id != '') ? orc_thread_id : null,
        customer_thread_id: (thread_id != '') ? thread_id : null,
        user_input: user_input.trim(),
        intents:(intents.length  > 0) ? intents : [],
        intent:(assistant_id != '') ? intent : '',
        previous_intent: (previous_intent != '') ? previous_intent : '',
      }
    };

    axios.request(options).then((response) => {

      const receivedMsg: ReceivedMsg = response.data;
      assistant_id = response.data.customer_assistant_id;
      thread_id = response.data.customer_thread_id;
      intents = response.data.intents;
      intent = response.data.intent;
      orc_assistant_id = response.data.orchestrator_assistant_id;
      orc_thread_id = response.data.orchestrator_thread_id;
      previous_intent = response.data.previous_intent;
      handleReceiveMessage(receivedMsg);
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleReceiveMessage = (receivedMsg: ReceivedMsg) => {
    const newMessage = { id: messages.length + 1, text: receivedMsg.customerResponse, isCustomer: false,timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, newMessage]);
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  const navigate = useNavigate();
  const handleGotoDashboard = () => {
    startTransition(() => {
      const path = `/`;
      navigate(path);
    })
  };
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="chat-container container">
        <div className='row chat-header'>
          <div className='col-2'>
            <Button onClick={handleGotoDashboard}>
              <Avatar image={{ src: "../src/assets/ArrowLeft.svg", }} />
            </Button>
          </div>
          <div className='col-1 chat-ico'>
            <Avatar image={{ src: "../src/assets/logo-bike.svg", }} />
          </div>
          <div className="col-8 chat-title">SwiftRide Enterprises</div>
        </div>
        <div className="message-list ">
        <div className='row'>
          <div className='col-1 mt15'><Avatar image={{ src: "../src/assets/logo-bike.svg", }} /></div>
          <div className='col agent-message'>Welcome to our store! Please let us know if there is anything we can do for you!</div>
        </div>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className='row'>
              <div className="timestamp">
                <div className='col float-end'>{message.timestamp}</div>
              </div>
              {!message.isCustomer && (
                <div className='col-1 mt15'>
                  <Avatar image={{ src: "../src/assets/logo-bike.svg" }} />
                </div>
              )}
              <div className={`col ${message.isCustomer ? 'customer-message' : 'agent-message'}`}>
                <span>{message.text}</span>
              </div>
            </div>
            ))}
          </div>
        </div>
        <div className='send-box-wrapper row'>
          <div className='col-11'>
            <Field size="small">
              <Textarea placeholder="Type your message" value={user_input} onChange={handleMessageChange}
                onKeyDown={handleKeyPress} rows={2} />
            </Field>
          </div>
          <div className='col-1 send-button'>
            <Button className="" onClick={handleSendMessage}>
            <Avatar image={{ src: "../src/assets/Iconsend.png", }} />
            </Button>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default Chat;
