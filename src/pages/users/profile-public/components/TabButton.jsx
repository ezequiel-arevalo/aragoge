const TabButton = ({ title, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${isActive ? 'bg-[#DA1641] text-white' : 'bg-gray-200 text-gray-700'}`}
    >
      {title}
    </button>
  );
  
  export default TabButton;