interface TypingIndicatorProps {
  typingUsers: string[];
}

export const TypingIndicator = ({ typingUsers }: TypingIndicatorProps) => {
  if (typingUsers.length === 0) return null;

  return (
    <div className="px-4 py-2 text-sm text-gray-500 italic">
      {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
    </div>
  );
};
