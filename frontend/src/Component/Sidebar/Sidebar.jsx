// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaHome, FaChevronDown } from "react-icons/fa";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 text-white h-full p-5 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
//         <button
//           className="text-xl mb-5 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <FaBars />
//         </button>

//         {/* Master Dropdown */}
//         <div>
//           <button
//             className="flex items-center w-full p-2 rounded hover:bg-gray-700"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <FaHome className="mr-2" />
//             {isOpen && <span className="flex-grow">Master</span>}
//             {isOpen && <FaChevronDown className={`${dropdownOpen ? "rotate-180" : ""} transition-transform`} />}
//           </button>
//           {/* Dropdown Items */}
//           <div className={`ml-5 mt-2 ${dropdownOpen ? "block" : "hidden"}`}>
//             <Link to="/property-form" className="block p-2 rounded hover:bg-gray-700">Property Master</Link>
//             <Link to="/renter-form" className="block p-2 rounded hover:bg-gray-700">Renter Master</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaChevronDown } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Reset dropdown when sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setDropdownOpen(false);
    }
  }, [isOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-[100vh] bg-gray-800 text-white p-5 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          className="text-xl mb-5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        {/* Master Dropdown */}
        <div>
          <button
            className="flex items-center w-full p-2 rounded hover:bg-gray-700"
            onClick={() => isOpen && setDropdownOpen(!dropdownOpen)}
          >
            <FaHome className="mr-2" />
            {isOpen && <span className="flex-grow">Master</span>}
            {isOpen && (
              <FaChevronDown
                className={`${dropdownOpen ? "rotate-180" : ""} transition-transform`}
              />
            )}
          </button>
          {/* Dropdown Items */}
          <div className={`ml-5 mt-2 ${isOpen && dropdownOpen ? "block" : "hidden"}`}>
            <Link
              to="/property-form"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Property Master
            </Link>
            <Link
              to="/renter-form"
              className="block p-2 rounded hover:bg-gray-700"
            >
              Renter Master
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
