import React from 'react';
import type { Chat, User } from '../types';
import { XIcon } from './Icons';
import { UserAvatar } from './UserAvatar';

interface AddMemberModalProps {
  chat: Chat | null;
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (chatId: string, userId: string) => void;
  allUsers: User[];
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  chat,
  isOpen,
  onClose,
  onAddMember,
  allUsers,
}) => {
  if (!isOpen || !chat) return null;

  const currentMemberIds = new Set(chat.members.map(m => m.id));
  const availableUsers = allUsers.filter(u => !currentMemberIds.has(u.id));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Add to "{chat.name}"</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 flex items-center justify-center gap-4 border-b border-zinc-800">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full">
            Add from Instagram
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full">
            Add from Contacts
          </button>
        </div>

        <div className="flex-1 p-2 overflow-y-auto">
          {availableUsers.length > 0 ? (
            availableUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800">
                <div className="flex items-center gap-3">
                  <UserAvatar src={user.avatarUrl} alt={user.name} size="md" />
                  <p className="font-semibold">{user.name}</p>
                </div>
                <button
                  onClick={() => onAddMember(chat.id, user.id)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-4 rounded-full text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-400 p-4">All users are already in this group.</p>
          )}
        </div>
        
        <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 rounded-b-2xl text-center">
            <button
                onClick={onClose}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};