import React, { useRef, useEffect } from 'react';
import type { Message as MessageType } from '../types';
import { CURRENT_USER_ID } from '../constants';
import { Message } from './Message';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === CURRENT_USER_ID;
        const prevMessage = messages[index - 1];
        const showAvatar = !isCurrentUser && (!prevMessage || prevMessage.senderId !== message.senderId);
        
        return (
          <Message
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            showAvatar={showAvatar}
          />
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
