import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import { CallModal } from './components/CallModal';
import { AddMemberModal } from './components/AddMemberModal';
import { MOCK_CHATS, CURRENT_USER_ID, MOCK_USERS, MOCK_USERS_MAP } from './constants';
import type { Chat, CallState, User } from './types';
import { CallType } from './types';

interface AddMemberModalState {
  isOpen: boolean;
  chat: Chat | null;
}

function App() {
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(MOCK_CHATS[0]?.id || null);
  const [callState, setCallState] = useState<CallState>({ active: false, type: null, chat: null });
  const [addMemberModalState, setAddMemberModalState] = useState<AddMemberModalState>({ isOpen: false, chat: null });

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSelectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
  }, []);

  const handleSendMessage = useCallback((chatId: string, text: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage = {
            id: `msg-${chatId}-${Date.now()}`,
            senderId: CURRENT_USER_ID,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
      });
    });
  }, []);

  const handleStartCall = useCallback((type: CallType, chat: Chat) => {
    setCallState({ active: true, type, chat });
  }, []);

  const handleEndCall = useCallback(() => {
    setCallState({ active: false, type: null, chat: null });
  }, []);

  const handleOpenAddMemberModal = useCallback((chat: Chat) => {
    setAddMemberModalState({ isOpen: true, chat });
  }, []);

  const handleCloseAddMemberModal = useCallback(() => {
    setAddMemberModalState({ isOpen: false, chat: null });
  }, []);
  
  const handleAddMember = useCallback((chatId: string, userId: string) => {
    const userToAdd = MOCK_USERS_MAP[userId];
    if (!userToAdd) return;

    setChats(prevChats => {
      const newChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          if (chat.members.some(member => member.id === userId)) {
            return chat;
          }
          return { ...chat, members: [...chat.members, userToAdd] };
        }
        return chat;
      });

      const updatedChat = newChats.find(c => c.id === chatId);
      if (updatedChat) {
          setAddMemberModalState(prevState => ({ ...prevState, chat: updatedChat }));
      }

      return newChats;
    });
  }, []);


  return (
    <div className="h-screen w-screen flex font-sans">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
      />
      <ChatView
        chat={activeChat}
        onSendMessage={handleSendMessage}
        onStartCall={handleStartCall}
        onOpenAddMemberModal={handleOpenAddMemberModal}
      />
      <CallModal callState={callState} onEndCall={handleEndCall} />
      <AddMemberModal
        isOpen={addMemberModalState.isOpen}
        chat={addMemberModalState.chat}
        onClose={handleCloseAddMemberModal}
        onAddMember={handleAddMember}
        allUsers={MOCK_USERS}
      />
    </div>
  );
}

export default App;