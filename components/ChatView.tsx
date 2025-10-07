import React from 'react';
import type { Chat } from '../types';
import { CallType } from '../types';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatViewProps {
  chat: Chat | undefined;
  onSendMessage: (chatId: string, text: string) => void;
  onStartCall: (type: CallType, chat: Chat) => void;
  onOpenAddMemberModal: (chat: Chat) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ chat, onSendMessage, onStartCall, onOpenAddMemberModal }) => {
  if (!chat) {
    return (
      <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500">
        <h2 className="text-2xl font-semibold">Select a chat to start messaging</h2>
      </div>
    );
  }

  const handleSendMessage = (text: string) => {
    onSendMessage(chat.id, text);
  };

  const handleStartCall = (type: CallType) => {
    onStartCall(type, chat);
  }

  const handleOpenAddMemberModal = () => {
    onOpenAddMemberModal(chat);
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 h-full flex flex-col bg-zinc-900">
      <ChatHeader chat={chat} onStartCall={handleStartCall} onOpenAddMemberModal={handleOpenAddMemberModal} />
      <MessageList messages={chat.messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatView;