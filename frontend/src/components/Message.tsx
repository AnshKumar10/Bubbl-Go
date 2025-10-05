import { type Message as MessageType } from "../types/chat";

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (message.event !== "message") return null;

  return (
    <article className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors duration-150 rounded-lg">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
        {getInitials(message.body.username)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-gray-900 truncate">
            {message.body.username}
          </span>
          <span className="text-xs text-gray-500">
            Today, {getCurrentTime()}
          </span>
        </div>
        <p className="text-gray-800 mt-1">{message.body.message}</p>
      </div>
    </article>
  );
};
