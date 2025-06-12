import { FaChevronDown, FaHeart } from 'react-icons/fa';

interface SidebarToggleButtonProps {
  onClick: () => void;
}

const SidebarToggleButton = ({ onClick }: SidebarToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="font-medium bg-secondary text-primary flex items-center gap-1 px-4 py-3 rounded-lg cursor-pointer"
    >
      My <FaHeart className="text-primary" />s List
      <FaChevronDown className="text-primary" />
    </button>
  );
};

export default SidebarToggleButton;
