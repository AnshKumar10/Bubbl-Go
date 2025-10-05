export interface MessageBody {
  username: string;
  message: string;
}

export interface Message {
  event: string;
  body: MessageBody;
  timestamp?: string;
}

export interface User {
  username: string;
  isTyping?: boolean;
}

export interface MessageProps {
  message: Message;
}

export interface TypingIndicatorProps {
  typingUsers: string[];
}

export interface MessageInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onTyping: () => void;
}

export interface UsernameInputProps {
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
