import React from "react";

const Modal = ({ isOpen, onClose, children }) =>
  isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4 relative">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={onClose} className="text-red-500">
            Close
          </button>
        </div>
        <div className="mt-4 overflow-y-auto max-h-96">{children}</div>
      </div>
    </div>
  ) : null;

export default Modal;
