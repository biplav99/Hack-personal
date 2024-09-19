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
   // Use a single state for both customer and agent messages, distinguished by `isCustomer`
   const [messages, setMessages] = useState<{ id: number; text: string; isCustomer: boolean; }[]>([]);
   const [user_input, setNewMessage] = useState('');
   const [customerResponse, setNewRcvMessage] = useState('');
   const [showAvatar, setShowAvatar] = useState(false);

   const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
       setNewMessage(event.target.value);
   };

   const handleSendMessage = () => {
       if (user_input.trim() === '') return;

       const newMessage = { id: messages.length + 1, text: user_input, isCustomer: true };
       setMessages([...messages, newMessage]); // Add new customer message to the messages array
       setNewMessage(''); // Clear input after sending

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

       axios.request(options).then((response) => {
           // Assuming response contains the assistant's message
           const receivedMsg: ReceivedMsg = response.data;
           assistant_id = response.data.customer_assistant_id;
           thread_id = response.data.customer_thread_id;
           handleReceiveMessage(receivedMsg);
       }).catch((error) => {
           console.error(error);
       });
   };

   const handleReceiveMessage = (receivedMsg: ReceivedMsg) => {
       const newMessage = { id: messages.length + 1, text: receivedMsg.customerResponse, isCustomer: false };
       setMessages((prev) => [...prev, newMessage]); // Add received agent message to the messages array
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
        <div className='row chat-header'>
           <div className='col-1'>
            <Avatar name="brand avatar" image={{ src: "../src/assets/ArrowLeft.svg", }} />
           </div>
          <div className='col-1 chat-ico'>
            <Avatar name="brand avatar" image={{ src: "../src/assets/logo-bike.svg", }} />
          </div>
          <div className="col-9 chat-title">Constonso Enterprises</div>
        </div>
        <div className="message-list ">
        <div className="messages">
                    {messages.map((message) => (
                        <div key={message.id} className={message.isCustomer ? 'customer-message' : 'agent-message'}>
                            <span>{message.text}</span>
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
