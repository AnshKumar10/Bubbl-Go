import { useState, useRef, useEffect, useCallback } from "react";
import {
  connect,
  emitStopTypingEvent,
  emitTypingEvent,
  sendMessage,
} from "./socket";
import { UsernameInput } from "./components/UsernameInput";
import { Message } from "./components/Message";
import { type Message as MessageType } from "./types/chat";
import { TypingIndicator } from "./components/TypingIndicator";
import { MessageInput } from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleIncomingMessage = (message: MessageType) => {
      const { event, body } = message;

      switch (event) {
        case "message":
          setMessages((prev) => [...prev, message]);
          break;

        case "typing":
          setTypingUsers((prev) =>
            !prev.includes(body.username) && body.username !== username
              ? [...prev, body.username]
              : prev
          );
          break;

        case "stop_typing":
          setTypingUsers((prev) =>
            prev.filter((user) => user !== body.username)
          );
          break;

        default:
          break;
      }
    };

    connect(handleIncomingMessage);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !username.trim()) {
      alert("Please enter a username and a message");
      return;
    }

    emitStopTypingEvent(username);
    sendMessage(input, username);
    setInput("");
    setIsTyping(false);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleTyping = useCallback(() => {
    if (!isTyping) {
      emitTypingEvent(username);
      setIsTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      emitStopTypingEvent(username);
      setIsTyping(false);
    }, 3000);
  }, [isTyping, username]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <UsernameInput
        username={username}
        onUsernameChange={(e) => setUsername(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <Message
            key={`${message.body.username}-${index}`}
            message={message}
          />
        ))}
        <TypingIndicator typingUsers={typingUsers} />
        <div ref={endRef} />
      </div>

      <MessageInput
        input={input}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />
    </div>
  );
}

export default App;
