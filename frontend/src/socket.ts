export type MessageEventCallback = (msg: Message) => void;

export type Message = {
  id: number;
  from: "user" | "bot";
  body: string;
};

const socket = new WebSocket("ws://localhost:8080/ws");

export const connect = (cb: MessageEventCallback) => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (event: MessageEvent) => {
    const msg: Message = JSON.parse(event.data);
    cb(msg);
  };

  socket.onclose = (event: CloseEvent) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error: Event) => {
    console.log("Socket Error: ", error);
  };
};

export const sendMessage = (message: string) => {
  console.log("Sending Message...", message);
  socket.send(message);
};
