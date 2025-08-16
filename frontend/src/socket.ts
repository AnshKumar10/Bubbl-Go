export type MessageEventCallback = (msg: Message) => void;

export type Message = {
  id: number;
  body: {
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
      message,
      username,
    })
  );
};
