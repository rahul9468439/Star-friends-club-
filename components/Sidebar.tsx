import React from 'react';
import type { Chat } from '../types';
import { UserAvatar } from './UserAvatar';
import { CURRENT_USER_ID } from '../constants';
import { AppIcon, CrownIcon } from './Icons';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onSelectChat }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
        <AppIcon className="w-8 h-8 flex-shrink-0" />
        <h1 className="text-xl font-bold truncate">Star Friends Club</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          const otherMembers = chat.members.filter(m => m.id !== CURRENT_USER_ID);
          const chatName = chat.isGroup ? chat.name : otherMembers[0]?.name || 'Unknown User';
          const avatarUrl = chat.isGroup ? `https://picsum.photos/seed/${chat.id}/100` : otherMembers[0]?.avatarUrl;
          const isAdmin = chat.isGroup && chat.adminId === CURRENT_USER_ID;

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center p-3 cursor-pointer hover:bg-zinc-800 transition-colors ${
                activeChatId === chat.id ? 'bg-zinc-800/50' : ''
              }`}
            >
              <UserAvatar src={avatarUrl} alt={chatName} size="lg" />
              <div className="ml-4 overflow-hidden">
                <p className="font-semibold truncate flex items-center">
                  {chatName}
                  {isAdmin && <CrownIcon className="w-4 h-4 ml-2 text-yellow-400 fill-current" />}
                </p>
                <p className="text-sm text-zinc-400 truncate">
                  {lastMessage ? `${lastMessage.senderId === CURRENT_USER_ID ? 'You: ' : ''}${lastMessage.text}` : 'No messages yet'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;