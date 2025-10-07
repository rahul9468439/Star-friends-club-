import React, { useState } from 'react';
import type { CallState } from '../types';
import { CallType } from '../types';
import { UserAvatar } from './UserAvatar';
import { PhoneIcon, MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from './Icons';

interface CallModalProps {
  callState: CallState;
  onEndCall: () => void;
}

const ParticipantVideo: React.FC<{ user: { name: string; avatarUrl: string }, showVideo: boolean }> = ({ user, showVideo }) => {
    return (
        <div className="relative w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden">
            {!showVideo && <UserAvatar src={user.avatarUrl} alt={user.name} size="xl" />}
            {showVideo && <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-400">Camera Off</div>}
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-sm">
                {user.name}
            </div>
        </div>
    );
};


export const CallModal: React.FC<CallModalProps> = ({ callState, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  if (!callState.active || !callState.chat) return null;

  const isVideoCall = callState.type === CallType.VIDEO;
  const participants = callState.chat.members;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold">{isVideoCall ? 'Video Call' : 'Voice Call'}</h2>
          <p className="text-sm text-zinc-400">{callState.chat.name}</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
            <div className={`grid gap-4 ${isVideoCall ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
                {participants.map(user => (
                   isVideoCall ? (
                       <ParticipantVideo key={user.id} user={user} showVideo={!isCameraOff} />
                   ) : (
                       <div key={user.id} className="flex flex-col items-center gap-2 text-center">
                           <UserAvatar src={user.avatarUrl} alt={user.name} size="xl" />
                           <p className="font-semibold">{user.name}</p>
                       </div>
                   )
                ))}
            </div>
        </div>
        
        <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 rounded-b-2xl">
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-white text-black' : 'bg-zinc-700 hover:bg-zinc-600'}`}
            >
              {isMuted ? <MicOffIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
            </button>

            {isVideoCall && (
              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`p-3 rounded-full transition-colors ${isCameraOff ? 'bg-white text-black' : 'bg-zinc-700 hover:bg-zinc-600'}`}
              >
                {isCameraOff ? <VideoOffIcon className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
              </button>
            )}

            <button onClick={onEndCall} className="p-4 rounded-full bg-red-600 hover:bg-red-500">
              <PhoneIcon className="w-6 h-6 transform rotate-[135deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
