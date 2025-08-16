import "./App.css";
import { useState, useRef, useEffect } from "react";
import { connect, sendMessage, type Message as Msg } from "./socket";

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    connect((msg: Msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <section className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <article key={index} className="message">
            {message.body}
          </article>
        ))}
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
