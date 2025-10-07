export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  members: User[];
  messages: Message[];
  isGroup: boolean;
  adminId?: string;
}

export enum CallType {
  VOICE = 'voice',
  VIDEO = 'video',
}

export interface CallState {
  active: boolean;
  type: CallType | null;
  chat: Chat | null;
}