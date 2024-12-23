import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((time) => time - 1), 1000);
      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [timeLeft]);

  // Detect screen size for responsive design
  useEffect(() => {
    const updateView = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", updateView);
    updateView(); // Check on initial load
    return () => window.removeEventListener("resize", updateView);
  }, []); 

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndClass = () => {
    if (selectedReason === "Other reason" && !otherReason) {
      alert("Please provide a reason!");
      return;
    }
    alert(`Class ended. Reason: ${selectedReason || otherReason}`);
    setTimeLeft(0); // Stop the timer
    setIsModalOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedReason(""); // Reset reason
    setOtherReason(""); // Reset custom reason
    setTimeLeft(600); // Reset timer back to 10 minutes
  };

  return (
    <nav className="bg-gray-100 text-black p-4 flex justify-between items-center shadow-sm relative">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <img src="/Logo.webp" alt="Logo" className="w-8 h-8" />
        {!isMobileView && (
          <>
            <div className="h-6 border-l border-gray-400"></div>
            <span className="text-lg font-bold">Trial Lesson [Grade 1-3]</span>
          </>
        )}
        {isMobileView && (
          <span className="text-lg font-bold text-black">Codingal</span>
        )}
      </div>

      {/* Post Link (Centered in Mobile View) */}
      {isMobileView && !isMenuOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/posts" className="text-gray-700 hover:text-black text-lg">
            Posts
          </Link>
        </div>
      )}

      {/* Hamburger Menu */}
      {isMobileView && (
        <button
          className="p-2 rounded-none flex flex-col justify-between items-center space-y-1 absolute right-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-1 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-1 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-1 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      )}

      {/* Hamburger Dropdown Menu */}
      {isMenuOpen && isMobileView && (
        <div className="absolute right-4 top-14 bg-white shadow-lg rounded p-4 w-40">
          <ul className="space-y-2">
            <li>
              <a href="#about-us" className="text-gray-700 hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="#blog" className="text-gray-700 hover:text-black">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact-us" className="text-gray-700 hover:text-black">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Timer and End Class Button (Hidden in Mobile View) */}
      {!isMobileView && (
        <div className="flex items-center space-x-4 ml-auto">
          <div className="text-lg font-semibold text-gray-700">
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition"
          >
            End Class
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold text-black mb-4">
              Select a reason to end class
            </h2>
            <form>
              <div className="space-y-2">
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Class completed"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Class completed
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Class interrupted/aborted"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Class interrupted/aborted
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Student didn't show up for the class"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Student didn't show up for the class
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Student didn't show any interest"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Student didn't show any interest
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Student got disconnected"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Student got disconnected
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="I got disconnected"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  I got disconnected
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="reason"
                    value="Other reason"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  Other reason
                </label>
                {selectedReason === "Other reason" && (
                  <textarea
                    placeholder="Type here"
                    className="border w-full mt-2 p-2 rounded text-black"
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                )}
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEndClass}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  End Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



