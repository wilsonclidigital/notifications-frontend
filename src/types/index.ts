export type Category = 'SPORTS' | 'FINANCE' | 'MOVIES';

export interface MessageRequest {
  category: Category;
  message: string;
}

export interface LogRecord {
  id: number;
  channel: string;
  userId: string;
  userName: string;
  category: Category;
  messageContent: string;
  timestamp: string;
}
