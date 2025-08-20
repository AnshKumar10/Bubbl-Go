package websocket

import (
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID         string
	Connection *websocket.Conn
	Pool       *Pool
}

type MessageBody struct {
	Action   string `json:"action"`
	Username string `json:"username"`
	Message  string `json:"message"`
}

type Message struct {
	Type  int         `json:"type"`
	Event string      `json:"event"`
	Body  MessageBody `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Connection.Close()
	}()

	for {
		messageType, p, err := c.Connection.ReadMessage()
		log.Println("Unknown event type:", messageType, p)

		if err != nil {
			log.Println(err)
			return
		}

		var body MessageBody
		if err := json.Unmarshal(p, &body); err != nil {
			log.Println("error unmarshaling:", err, string(p))
		}

		switch body.Action {
		case "message":
			c.Pool.Broadcast <- Message{Type: messageType, Event: "message", Body: body}
		case "typing":
			c.Pool.Broadcast <- Message{Type: messageType, Event: "typing", Body: body}
		case "stop_typing":
			c.Pool.Broadcast <- Message{Type: messageType, Event: "stop_typing", Body: body}
		default:
			log.Println("Unknown event type:", body)
		}

	}
}
