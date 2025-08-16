import "./App.css";
import { useState, useRef, useEffect } from "react";
import { connect, sendMessage, type Message as Msg } from "./socket";

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    connect((msg: Msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  console.log(messages);

  // Function to get user initials for avatars
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to get avatar CSS class based on username
  const getAvatarClass = (username: string) => {
    const name = username.toLowerCase();
    if (name.includes("david")) return "avatar avatar-david";
    if (name.includes("charlie")) return "avatar avatar-charlie";
    if (name.includes("bob")) return "avatar avatar-bob";
    return "avatar avatar-default";
  };

  // Function to get current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !username.trim()) {
      alert("Enter username first and then message");
      return;
    }
    sendMessage(input, username);
    setInput("");
  };

  return (
    <section className="chat-container">
      {/* Header with Username Input */}
      <div className="chat-header">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
      </div>

      <div className="messages">
        {messages.map((msg, index) =>
          msg.body.username === "System" ? (
            <div key={index} className="system-message">
              {msg.body.message}
            </div>
          ) : (
            <article key={index} className="message fade-in">
              {/* User Avatar */}
              <div className={getAvatarClass(msg.body.username)}>
                {getInitials(msg.body.username)}
              </div>

              {/* Message Content */}
              <div className="message-content">
                {/* Message Header */}
                <div className="message-header">
                  <span className="username">{msg.body.username}</span>
                  <span className="timestamp">Today, {getCurrentTime()}</span>
                </div>

                {/* Message Bubble */}
                <div className="message-bubble">{msg.body.message}</div>
              </div>
            </article>
          )
        )}
        <div ref={endRef}></div>
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">➤</button>
      </form>
    </section>
  );
}
