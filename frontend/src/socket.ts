export type MessageEventCallback = (msg: Message) => void;

export type Message = {
  id: number;
  event: string;
  body: {
    action: string;
    message: string;
    username: string;
  };
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

export const sendMessage = (message: string, username: string) => {
  console.log("Sending Message...", message);

  socket.send(
    JSON.stringify({
      action: "message",
      message,
      username,
    })
  );
};

export const emitTypingEvent = (username: string) => {
  console.log("Emitting Type Event");

  socket.send(
    JSON.stringify({
      username,
      action: "typing",
      message: "",
    })
  );
};

export const emitStopTypingEvent = (username: string) => {
  console.log("Emitting Type Event");

  socket.send(
    JSON.stringify({
      username,
      action: "stop_typing",
      message: "",
    })
  );
};
