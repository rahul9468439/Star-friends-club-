import React, { useState } from 'react';
import { SendIcon } from './Icons';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <div className="p-4 bg-zinc-950 border-t border-zinc-800">
      <form onSubmit={handleSubmit} className="flex items-center bg-zinc-800 rounded-full px-4 py-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-transparent focus:outline-none"
        />
        <button type="submit" className="text-blue-500 hover:text-blue-400 disabled:text-zinc-500 transition-colors" disabled={!text.trim()}>
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
