import deleteIcon from "@assets/deleteIcon.png";

interface HeaderProps {
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear }) => (
  <div className="flex justify-between items-center bg-gray-500 text-white p-4">
    <div className="flex flex-1 justify-center">
      <h1 className="text-xl font-bold">Shopping List</h1>
    </div>
    <button onClick={onClear} className="p-1">
      <img
        className="w-6 h-6 object-cover"
        src={deleteIcon}
        alt="delete"
      />
    </button>
  </div>
);
