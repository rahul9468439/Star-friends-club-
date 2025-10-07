import type { User, Chat } from './types';

export const CURRENT_USER_ID = 'user-1';
export const APP_ADMIN_ID = 'user-1'; // Global App Admin

const users: User[] = [
  { id: 'user-1', name: 'You', avatarUrl: 'https://picsum.photos/seed/you/100' },
  { id: 'user-2', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/alex/100' },
  { id: 'user-3', name: 'Samantha Bee', avatarUrl: 'https://picsum.photos/seed/samantha/100' },
  { id: 'user-4', name: 'Jordan Lee', avatarUrl: 'https://picsum.photos/seed/jordan/100' },
  { id: 'user-5', name: 'Casey Smith', avatarUrl: 'https://picsum.photos/seed/casey/100' },
  { id: 'user-6', name: 'Taylor Ray', avatarUrl: 'https://picsum.photos/seed/taylor/100' },
  { id: 'user-7', name: 'Morgan Cruz', avatarUrl: 'https://picsum.photos/seed/morgan/100' },
  { id: 'user-8', name: 'Riley Kim', avatarUrl: 'https://picsum.photos/seed/riley/100' },
];

export const MOCK_USERS: User[] = users;

export const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    name: 'Weekend Trip Crew',
    members: [users[0], users[1], users[2], users[3]],
    isGroup: true,
    adminId: 'user-1',
    messages: [
      { id: 'msg-1-1', senderId: 'user-2', text: 'Hey everyone! Are we still on for this weekend?', timestamp: '10:30 AM' },
      { id: 'msg-1-2', senderId: 'user-3', text: 'Yes! I\'m so excited. I already packed my bags.', timestamp: '10:31 AM' },
      { id: 'msg-1-3', senderId: 'user-1', text: 'Awesome! I\'ll bring the snacks.', timestamp: '10:32 AM' },
      { id: 'msg-1-4', senderId: 'user-4', text: 'I can drive. My car has plenty of room.', timestamp: '10:33 AM' },
      { id: 'msg-1-5', senderId: 'user-2', text: 'Perfect! This is going to be great.', timestamp: '10:34 AM' },
    ],
  },
  {
    id: 'chat-2',
    name: 'Jordan Lee',
    members: [users[0], users[3]],
    isGroup: false,
    messages: [
      { id: 'msg-2-1', senderId: 'user-4', text: 'Hey, did you see the latest design mockups?', timestamp: 'Yesterday' },
      { id: 'msg-2-2', senderId: 'user-1', text: 'Just looked at them. They look fantastic! Great work.', timestamp: 'Yesterday' },
      { id: 'msg-2-3', senderId: 'user-4', text: 'Thanks! I appreciate the feedback.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'chat-3',
    name: 'Project Phoenix',
    members: [users[0], users[2], users[4]],
    isGroup: true,
    adminId: 'user-5',
    messages: [
      { id: 'msg-3-1', senderId: 'user-5', text: 'Quick update: The client loved the presentation.', timestamp: 'Monday' },
      { id: 'msg-3-2', senderId: 'user-3', text: 'That\'s amazing news! Congrats!', timestamp: 'Monday' },
    ],
  },
  {
    id: 'chat-4',
    name: 'Alex Doe',
    members: [users[0], users[1]],
    isGroup: false,
    messages: [
        { id: 'msg-4-1', senderId: 'user-1', text: 'Want to grab lunch tomorrow?', timestamp: '9:01 AM' },
        { id: 'msg-4-2', senderId: 'user-2', text: 'Sounds good! Where to?', timestamp: '9:05 AM' },
    ]
  }
];
