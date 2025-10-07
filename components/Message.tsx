import React from 'react';
import type { Message as MessageType } from '../types';
import { MOCK_USERS_MAP } from '../constants';
import { UserAvatar } from './UserAvatar';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
  showAvatar: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isCurrentUser, showAvatar }) => {
  const sender = MOCK_USERS_MAP[message.senderId];

  const bubbleClasses = isCurrentUser
    ? 'bg-blue-600 rounded-br-none'
    : 'bg-zinc-700 rounded-bl-none';

  const containerClasses = isCurrentUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-end gap-2 ${containerClasses} my-1`}>
      {!isCurrentUser && (
        <div className="w-8 h-8 flex-shrink-0">
         {showAvatar && sender && <UserAvatar src={sender.avatarUrl} alt={sender.name} size="sm" />}
        </div>
      )}
      <div className={`flex flex-col max-w-xs md:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
         {!isCurrentUser && showAvatar && <p className="text-xs text-zinc-400 mb-1 ml-3">{sender?.name}</p>}
        <div className={`px-4 py-2 rounded-2xl ${bubbleClasses}`}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};
