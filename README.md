# BubblGo


BubblGo is a lightweight, real-time chat application that enables multiple users to communicate instantly through WebSocket connections. The backend is built with Go for high performance and concurrency, while the frontend uses React with TypeScript for a modern, type-safe user experience.

## Features

- **Real-time messaging** - Instant message delivery using WebSocket protocol
- **Multi-user support** - Multiple clients can connect and chat simultaneously
- **User avatars** - Dynamic avatar generation based on user initials
- **System notifications** - Join/leave notifications for connected users
- **Auto-scroll** - Automatic scrolling to latest messages
- **Modern UI** - Clean and responsive chat interface

## Tech Stack

### Backend
- **Go** 1.24.6
- **Gorilla WebSocket** v1.5.3 - WebSocket implementation
- **Docker** - Containerization support

### Frontend
- **React** 19.1.1
- **TypeScript** 5.8.3
- **Vite** 7.1.2 - Build tool and dev server
- **ESLint** - Code linting

## Project Structure

```
BubblGo/
├── backend/
│   ├── main.go              # Entry point and HTTP server setup
│   ├── pkg/
│   │   └── websocket/       # WebSocket connection handling
│   ├── go.mod               # Go module dependencies
│   ├── go.sum               # Go module checksums
│   └── Dockerfile           # Docker configuration
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main chat component
│   │   ├── socket.ts        # WebSocket client logic
│   │   └── main.tsx         # React entry point
│   ├── package.json         # Node dependencies
│   └── vite.config.ts       # Vite configuration
└── README.md
```

## Getting Started

### Prerequisites

- **Go** 1.24.6 or higher
- **Node.js** 16+ and npm
- **Docker** (optional, for containerized deployment)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod download
```

3. Run the backend server:
```bash
go run main.go
```

The server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install npm dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port)

### Docker Deployment

Build and run the backend using Docker:

```bash
cd backend
docker build -t bubblgo-backend .
docker run -p 8080:8080 bubblgo-backend
```

## Usage

1. Start the backend server (it will listen on port 8080)
2. Start the frontend development server
3. Open your browser and navigate to the frontend URL
4. Enter a username in the header input field
5. Type your message and press Enter or click the send button
6. Open multiple browser tabs/windows to simulate multiple users

## API Endpoints

### WebSocket Endpoint
- **URL**: `ws://localhost:8080/ws`
- **Protocol**: WebSocket
- **Description**: Establishes WebSocket connection for real-time chat

### Message Format

**Client to Server:**
```json
{
  "message": "Hello, World!",
  "username": "John Doe"
}
```

**Server to Client:**
```json
{
  "id": 1,
  "body": {
    "message": "Hello, World!",
    "username": "John Doe"
  }
}
```

## Development

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend Commands

- `go run main.go` - Run the server
- `go build` - Build the binary
- `go mod tidy` - Clean up dependencies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

AnshKumar10

## Acknowledgments

- Built with [Gorilla WebSocket](https://github.com/gorilla/websocket)
- Frontend powered by [Vite](https://vitejs.dev/) and [React](https://react.dev/)
