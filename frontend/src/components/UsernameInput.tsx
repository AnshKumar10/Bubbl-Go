interface UsernameInputProps {
  username: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UsernameInput = ({
  username,
  onUsernameChange,
}: UsernameInputProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={onUsernameChange}
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};
