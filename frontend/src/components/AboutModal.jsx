import React from "react";

const AboutModal = ({ closeAbout }) => {
  return (
    <div
      onClick={closeAbout}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="w-screen h-screen flex justify-center items-center">
        <div
          className="border-2 bg-white flex flex-col text-center p-6 rounded-lg max-w-[90vw] md:max-w-[60vw] lg:max-w-[40vw] shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside the content area
        >
          <h2 className="text-2xl font-semibold mb-4">About The Project</h2>
          <p className="text-gray-700 mb-4">
            KIWI TECH is a e-commerce website project that sells a variety of tech products.
          </p>
          <p className="text-gray-700 mb-6">
            The project is built on React, Firebase Cloud Functions and TailwindCSS.
          </p>
          <a
            href="https://github.com/xche529/tech_store"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-medium hover:underline mb-8"
          >
            GitHub
          </a>
          <hr className="border-t-2 border-gray-300 mb-6" />
          <h2 className="text-xl font-semibold mb-4">Contributors</h2>
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://github.com/xche529"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Tommy
            </a>
            <a
              href="https://github.com/y-sun311"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              James
            </a>
            <a
              href="https://github.com/Ruotong-Betty-Zhang"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Betty
            </a>
          </div>
          <button
            onClick={closeAbout}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
