import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndClass: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onEndClass }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">End Class</h2>
        <p>Are you sure you want to end the class?</p>
        <div className="mt-4 space-x-4">
          <button
            className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
            onClick={onEndClass}
          >
            Yes, End Class
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
