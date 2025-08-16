package websocket

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID         string
	Connection *websocket.Conn
	Pool       *Pool
}

type MessageBody struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

type Message struct {
	Type int         `json:"type"`
	Body MessageBody `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Connection.Close()
	}()

	for {
		messageType, p, err := c.Connection.ReadMessage()

		if err != nil {
			log.Println(err)
			return
		}

		var body MessageBody
		if err := json.Unmarshal(p, &body); err != nil {
			log.Println("error unmarshaling:", err, string(p))
		}

		message := Message{Type: messageType, Body: body}

		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)

	}
}
