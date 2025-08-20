import { useState, useEffect, useCallback } from "react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onTyping: () => void;
}

export const MessageInput = ({
  input,
  onInputChange,
  onSendMessage,
  onTyping,
}: MessageInputProps) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onInputChange(value);

      // Clear previous timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set a new timeout
      const timeout = setTimeout(() => {
        onTyping();
      }, 500); // 500ms debounce time

      setTypingTimeout(timeout);
    },
    [onInputChange, onTyping, typingTimeout]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <form
      onSubmit={onSendMessage}
      className="flex items-center gap-2 p-4 border-t border-gray-200"
    >
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};
