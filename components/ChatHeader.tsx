import React from 'react';
import type { Chat } from '../types';
import { CallType } from '../types';
import { PhoneIcon, VideoIcon, MoreHorizontalIcon, AddUserIcon } from './Icons';
import { UserAvatar } from './UserAvatar';
import { CURRENT_USER_ID, MOCK_USERS_MAP, APP_ADMIN_ID } from '../constants';

interface ChatHeaderProps {
  chat: Chat;
  onStartCall: (type: CallType) => void;
  onOpenAddMemberModal: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onStartCall, onOpenAddMemberModal }) => {
    const otherMembers = chat.members.filter(m => m.id !== CURRENT_USER_ID);
    const chatName = chat.isGroup ? chat.name : otherMembers[0]?.name || 'Unknown User';
    const avatarUrl = chat.isGroup ? `https://picsum.photos/seed/${chat.id}/100` : otherMembers[0]?.avatarUrl;

    const isAppAdmin = CURRENT_USER_ID === APP_ADMIN_ID;
    const isGroupAdmin = chat.adminId === CURRENT_USER_ID;
    const canControlGroup = chat.isGroup && (isGroupAdmin || isAppAdmin);
    
    const canStartCall = !chat.isGroup || canControlGroup;
    const adminUser = chat.adminId ? MOCK_USERS_MAP[chat.adminId] : null;

    let subtitle = chat.members.map(m => m.name).join(', ');
    if (chat.isGroup && adminUser) {
        subtitle = `Admin: ${adminUser.name}. Members: ${subtitle}`;
    }

  return (
    <div className="flex items-center justify-between p-3 bg-zinc-950 border-b border-zinc-800">
      <div className="flex items-center">
        {avatarUrl && <UserAvatar src={avatarUrl} alt={chatName} size="md" />}
        <div className="ml-4">
          <p className="font-bold">{chatName}</p>
          <p className="text-sm text-zinc-400 truncate max-w-[200px] sm:max-w-xs md:max-w-md">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {canControlGroup && (
            <button
                onClick={onOpenAddMemberModal}
                className="text-zinc-400 hover:text-white transition-colors"
                title="Add members to group"
                aria-label="Add members to group"
            >
                <AddUserIcon className="w-6 h-6" />
            </button>
        )}
        <button
          onClick={() => onStartCall(CallType.VOICE)}
          className="text-zinc-400 hover:text-white transition-colors disabled:text-zinc-600 disabled:cursor-not-allowed"
          disabled={!canStartCall}
          title={canStartCall ? 'Start voice call' : 'Only the group admin can start a call'}
          aria-label={canStartCall ? 'Start voice call' : 'Only the group admin can start a call'}
        >
          <PhoneIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => onStartCall(CallType.VIDEO)}
          className="text-zinc-400 hover:text-white transition-colors disabled:text-zinc-600 disabled:cursor-not-allowed"
          disabled={!canStartCall}
          title={canStartCall ? 'Start video call' : 'Only the group admin can start a call'}
          aria-label={canStartCall ? 'Start video call' : 'Only the group admin can start a call'}
        >
          <VideoIcon className="w-6 h-6" />
        </button>
        <button className="text-zinc-400 hover:text-white transition-colors">
            <MoreHorizontalIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};